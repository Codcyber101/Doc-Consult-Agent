#!/usr/bin/env bash
# merge_coordinator_enhanced.sh
# Enhanced Merge Coordinator:
# - Detects overlapping/conflicting files modified by multiple branches
# - Includes small diffs (truncated) in the prompt, respecting token/size limits
# - Produces a Gemini-assisted PR-ready summary per branch
# - Writes historical reports to logs/merge-coordinator-YYYYMMDD-HHMMSS.log
# - Writes PR draft markdown files to ../worktrees/pr-drafts/<branch>-draft.md
# Safety: This script is read-only. It never pushes changes or creates branches on remotes.

if [ ! -d "$WORKTREES_DIR" ] || [ -z "$(ls -A "$WORKTREES_DIR" 2>/dev/null | grep -v logs)" ]; then
  echo "[merge-coordinator] No active worktrees found."
  echo "[merge-coordinator] Hint: run ./scripts/gemini_orchestrator.sh start first."
  exit 0
fi


set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
WORKTREES_DIR="${WORKTREES_DIR:-$REPO/../worktrees}"
LOG_DIR="${LOG_DIR:-$WORKTREES_DIR/logs}"
OUT_DIR_PR_DRAFTS="${OUT_DIR_PR_DRAFTS:-$WORKTREES_DIR/pr-drafts}"
GEMINI_CMD="${GEMINI_CMD:-gemini}"
GEMINI_FLAGS="${GEMINI_FLAGS:---headless}"

# Limits to keep prompt size reasonable
MAX_TOTAL_BYTES=${MAX_TOTAL_BYTES:-15000}   # total chars of diffs included
MAX_BYTES_PER_FILE=${MAX_BYTES_PER_FILE:-2000} # max chars per file
MAX_FILES_PER_BRANCH=${MAX_FILES_PER_BRANCH:-8} # top N files per branch to include
SNIPPET_LINES_PER_FILE=${SNIPPET_LINES_PER_FILE:-120} # unified diff lines to include per file

mkdir -p "$LOG_DIR" "$OUT_DIR_PR_DRAFTS"

timestamp() { date +"%Y%m%d-%H%M%S"; }
TS="$(timestamp)"
OUTFILE="$LOG_DIR/merge-coordinator-$TS.log"

# pick base branch (prefer main/master)
pick_base_branch() {
  if git -C "$REPO" rev-parse --verify --quiet refs/heads/main >/dev/null 2>&1; then
    echo "main"
  elif git -C "$REPO" rev-parse --verify --quiet refs/heads/master >/dev/null 2>&1; then
    echo "master"
  else
    git -C "$REPO" rev-parse --abbrev-ref HEAD
  fi
}

BASE_BRANCH="$(pick_base_branch)"
{
  echo "[merge-coordinator] Run at: $(date -Iseconds)"
  echo "[merge-coordinator] Base branch: $BASE_BRANCH"
} | tee -a "$OUTFILE"

# collect worktrees
worktrees=()
for d in "$WORKTREES_DIR"/*/; do
  [ -d "$d" ] || continue
  if [ -d "${d%/}/.git" ]; then
    worktrees+=("${d%/}")
  fi
done

if [ ${#worktrees[@]} -eq 0 ]; then
  echo "No worktrees found in $WORKTREES_DIR" | tee -a "$OUTFILE"
  exit 0
fi

# gather diffs and file hits
declare -A file_to_branches
declare -A branch_shortstat
declare -A branch_files_list

for wt in "${worktrees[@]}"; do
  branch_name="$(git -C "$wt" branch --show-current || echo "$(basename "$wt")")"
  # ensure we have base available locally for diff; fetch quietly if needed
  git -C "$REPO" fetch --quiet || true

  # compute shortstat vs base (use three-dot to find commits not merged)
  set +e
  shortstat="$(git -C "$wt" diff --shortstat "$BASE_BRANCH...HEAD" 2>/dev/null || true)"
  set -e

  branch_shortstat["$branch_name"]="$shortstat"

  # list changed files
  files_raw="$(git -C "$wt" diff --name-only "$BASE_BRANCH...HEAD" 2>/dev/null || true)"
  files=( )
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    files+=("$f")
    file_to_branches["$f"]+="$branch_name ";
  done <<<"$files_raw"

  branch_files_list["$branch_name"]="${files[*]}"

  echo "Collected: $branch_name -> ${#files[@]} changed files" | tee -a "$OUTFILE"
done

# detect overlapping files
conflicts_found=false
conflict_report=""
for f in "${!file_to_branches[@]}"; do
  branches_str="${file_to_branches[$f]}"
  # count how many branches touched the file
  count_branches="$(echo "$branches_str" | wc -w)"
  if [ "$count_branches" -gt 1 ]; then
    conflicts_found=true
    conflict_report+="- $f modified in: $branches_str\n"
  fi
done

if [ "$conflicts_found" = true ]; then
  echo "Conflicts detected (files modified in >1 branch):" | tee -a "$OUTFILE"
  echo -e "$conflict_report" | tee -a "$OUTFILE"
else
  echo "No overlapping file edits detected." | tee -a "$OUTFILE"
fi

# Build prompt parts
prompt_header="Merge coordinator report (base: $BASE_BRANCH)\nRun at: $(date -Iseconds)\n\n"
prompt_body=""

# include per-branch summary and top changed files
for wt in "${worktrees[@]}"; do
  branch_name="$(git -C "$wt" branch --show-current || echo "$(basename "$wt")")"
  shortstat="${branch_shortstat[$branch_name]}"
  files_line="${branch_files_list[$branch_name]}"
  prompt_body+="Branch: $branch_name\n"
  prompt_body+=" - Shortstat: ${shortstat:-(no summary available)}\n"
  prompt_body+=" - Top changed files:\n"
  if [ -z "$files_line" ]; then
    prompt_body+="    (no changes)\n\n"
    continue
  fi
  # list top N files
  idx=0
  for f in $files_line; do
    [ $idx -ge $MAX_FILES_PER_BRANCH ] && break
    prompt_body+="    - $f\n"
    idx=$((idx+1))
  done
  prompt_body+="\n"
done

# Now include small diffs, obeying total byte budget
bytes_used=0
diffs_section="\n--- DIFF SNIPPETS (truncated per-file) ---\n"
for wt in "${worktrees[@]}"; do
  branch_name="$(git -C "$wt" branch --show-current || echo "$(basename "$wt")")"
  files_line="${branch_files_list[$branch_name]}"
  if [ -z "$files_line" ]; then
    continue
  fi
  diffs_section+="\n>> Branch: $branch_name\n"
  idx=0
  for f in $files_line; do
    [ $idx -ge $MAX_FILES_PER_BRANCH ] && break
    # get unified diff for this file vs base
    # limit lines and bytes per file
    raw_diff="$(git -C "$wt" diff -U$SNIPPET_LINES_PER_FILE "$BASE_BRANCH...HEAD" -- "$f" 2>/dev/null || true)"
    if [ -z "$raw_diff" ]; then
      idx=$((idx+1))
      continue
    fi
    # truncate per-file bytes
    file_excerpt="$(printf "%s" "$raw_diff" | head -c $MAX_BYTES_PER_FILE)"
    file_bytes="$(printf "%s" "$file_excerpt" | wc -c)"
    # if adding this will exceed total budget, stop including diffs
    if [ $((bytes_used + file_bytes)) -gt $MAX_TOTAL_BYTES ]; then
      diffs_section+="[truncated: total diff budget reached]\n"
      bytes_used=$MAX_TOTAL_BYTES
      break 2
    fi
    diffs_section+="---- file: $f ----\n"
    diffs_section+="$file_excerpt\n\n"
    bytes_used=$((bytes_used + file_bytes))
    idx=$((idx+1))
  done
done

# assemble full prompt
full_prompt="${prompt_header}${prompt_body}${diffs_section}\n\nPlease produce for each branch: 1) one-sentence summary, 2) risk (low/med/high) and one-line reason, 3) a concise PR title and a 3-5 line PR description, 4) suggested reviewers and test steps. Also mark any overlapping files as potential conflicts. Output in clear markdown with headings."

# write prompt to temp file
PROMPT_FILE="/tmp/merge_coordinator_prompt_$TS.txt"
printf "%s\n" "$full_prompt" > "$PROMPT_FILE"

# log prompt (truncated) and metadata
echo "PROMPT (truncated 2000 chars):" | tee -a "$OUTFILE"
printf "%s\n" "$(printf "%s" "$full_prompt" | head -c 2000)" | tee -a "$OUTFILE"

echo "Running Gemini..." | tee -a "$OUTFILE"

if ! command -v "$GEMINI_CMD" >/dev/null 2>&1; then
  echo "ERROR: gemini CLI not found at $GEMINI_CMD" | tee -a "$OUTFILE"
  exit 2
fi

# run Gemini headless
REPLY_FILE="/tmp/merge_coordinator_reply_$TS.txt"
cat "$PROMPT_FILE" | $GEMINI_CMD $GEMINI_FLAGS 2>&1 | tee "$REPLY_FILE" "$OUTFILE"

# Save assistant output into per-branch PR draft files (simple split by headings)
assistant_text="$(cat "$REPLY_FILE")"

# naive parsing: look for lines starting with 'Branch:' in the prompt to map; but assistant output may include headings per branch
# We'll simply write the full assistant output to a timestamped report and create per-branch draft markdown files with assistant output as body for human edit.
REPORT_PATH="$LOG_DIR/merge-coordinator-report-$TS.md"
{
  echo "# Merge coordinator report - $TS"
  echo
  echo "Base branch: $BASE_BRANCH"
  echo
  echo "## Assistant summary"
  cat "$REPLY_FILE"
  echo
  echo "## Raw prompt (truncated)"
  printf "%s\n" "$(cat "$PROMPT_FILE" | head -n 400)"
} > "$REPORT_PATH"

# create a PR draft per branch: include assistant summary + header
for wt in "${worktrees[@]}"; do
  branch_name="$(git -C "$wt" branch --show-current || echo "$(basename "$wt")")"
  draft_file="$OUT_DIR_PR_DRAFTS/${branch_name}-draft-$TS.md"
  {
    echo "# PR draft for branch: $branch_name"
    echo
    echo "## Suggested PR body (assistant output)"
    echo
    # put full assistant output -- human will trim to relevant part
    cat "$REPLY_FILE"
    echo
    echo "---"
    echo "# Context: files changed (top list)"
    echo
    git -C "$wt" diff --name-only "$BASE_BRANCH...HEAD" | sed -n '1,200p'
    echo
    echo "# How to create PR (manual guide)"
    echo "1. Inspect changes in $wt" 
    echo "2. Run: git add -A && git commit -m \"<your message>\"" 
    echo "3. Create PR branch: git push origin HEAD:refs/heads/ai/pr-draft-$TS-$branch_name"
    echo "4. Use gh or GitHub UI to open PR with title/body above"
  } > "$draft_file"
  echo "Wrote PR draft: $draft_file" | tee -a "$OUTFILE"
done

echo "Merge coordinator run complete. Full report: $REPORT_PATH" | tee -a "$OUTFILE"

# print short pointer
echo "Logs: $OUTFILE"
echo "Report: $REPORT_PATH"

echo "Done."
