# (paste the full script content above here)
#!/usr/bin/env bash
# ensure_git_exclude.sh
# Safely ensure local (non-versioned) git excludes for agent runtime files.
# - keeps .gemini/skills tracked
# - excludes only volatile .gemini subpaths and other generated artifacts
# - idempotent, creates a timestamped backup of .git/info/exclude
# - refuses to run if .git/info/exclude already excludes .gemini/ entirely

set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
EXCLUDE="$REPO/.git/info/exclude"

# safety: ensure repo exists and .git/info/exclude is present
if [ ! -d "$REPO/.git" ]; then
  echo "ERROR: $REPO does not look like a git repository (no .git directory)."
  exit 2
fi

# ensure exclude file exists
mkdir -p "$(dirname "$EXCLUDE")"
touch "$EXCLUDE"

# check for a dangerous rule that excludes .gemini/ entirely
if grep -E -q '^[[:space:]]*\.gemini(/\*|/|$)' "$EXCLUDE"; then
  echo "ERROR: $EXCLUDE already contains a rule that excludes '.gemini/' entirely."
  echo "This would hide .gemini/skills from Git. Please edit $EXCLUDE to remove that rule"
  echo "or adjust it to only exclude runtime subpaths (e.g. .gemini/cache/)."
  exit 3
fi

# backup the exclude file
TS="$(date +%Y%m%d-%H%M%S)"
BACKUP="$EXCLUDE.bak.$TS"
cp "$EXCLUDE" "$BACKUP"
echo "Backed up existing exclude file to: $BACKUP"

# helper: append a pattern block if the first marker line is not present
append_block_if_missing() {
  local marker="$1" ; shift
  local -a lines=( "$@" )
  # marker is a unique comment to detect the block
  if grep -Fq "$marker" "$EXCLUDE"; then
    echo " - block already present: $marker"
    return 0
  fi

  {
    printf "\n# %s\n" "$marker"
    for l in "${lines[@]}"; do
      printf "%s\n" "$l"
    done
  } >> "$EXCLUDE"

  echo " - appended block: $marker"
}

echo "Ensuring local git excludes at $EXCLUDE"

# Block 1: generated agent files common to orchestrator
append_block_if_missing "ignore generated agent files" \
  "GEMINI.md" \
  ".agent-local/" \
  "image.png" \
  "*.agent.log"

# Block 2: volatile .gemini subpaths — do NOT exclude .gemini/skills/
append_block_if_missing "ignore volatile .gemini runtime paths (keep .gemini/skills/ tracked)" \
  ".gemini/cache/" \
  ".gemini/history/" \
  ".gemini/sessions/" \
  ".gemini/tmp/" \
  ".gemini/logs/" \
  ".gemini/*.lock" \
  ".gemini/runtime.json"

# Extra: task queues / local runtime folders placed outside repo may be ignored here too if you use them
append_block_if_missing "ignore local task queue and worktree logs" \
  "../tasks/queue/" \
  "../worktrees/logs/" \
  "../worktrees/pr-drafts/"

echo "Done. Current $EXCLUDE content (last 200 lines):"
tail -n 200 "$EXCLUDE"
