#!/usr/bin/env bash
# gemini_orchestrator.sh
# A robust orchestrator to run multiple gemini-cli agents in tmux, one per git worktree/branch.
# Features:
# - create git worktrees for branches
# - start a tmux session with a window per branch
# - each window runs the agent in a restart loop and logs output
# - supports interactive (gemini) and headless mode
# - stop / status / restart / cleanup commands
#
# Usage:
#   ./gemini_orchestrator.sh start
#   ./gemini_orchestrator.sh stop
#   ./gemini_orchestrator.sh status
#   ./gemini_orchestrator.sh attach
#   ./gemini_orchestrator.sh cleanup
#
# Configure the variables in the CONFIG section below or pass overrides as ENV vars.

set -euo pipefail
shopt -s inherit_errexit || true

### CONFIG (edit these or export overrides before running)
REPO="${REPO:-/home/tcyber/Projects/Doc-Consult-Agent}"                 # path to your git repo root
WORKTREES_DIR="${WORKTREES_DIR:-$REPO/../worktrees}" # where worktrees will live
SESSION_NAME="${SESSION_NAME:-gemini-agents}"        # tmux session name
LOG_DIR="${LOG_DIR:-$WORKTREES_DIR/logs}"           # per-agent logs
# Branch list: space-separated. Adjusted from your repo branches.
# Remove any empty placeholders; whitespace-only entries will be skipped during processing.
BRANCHES=("feat/frontend" "feat/backend-agents" "feat/backend-api" "main")

# COMMAND_TEMPLATE: what to run inside each worktree. Use {WORKTREE} and {BRANCH_SAFE} tokens.
# By default it runs interactive gemini. For headless replace with something like:
# 'bash -lc "source .env 2>/dev/null || true; echo \"$PROMPT\" | gemini --headless"'
COMMAND_TEMPLATE='bash -lc "source .env 2>/dev/null || true; exec gemini"'

# Restart policy: seconds to wait before restarting a crashed agent
RESTART_DELAY=${RESTART_DELAY:-2}
MAX_RESTARTS=${MAX_RESTARTS:-0} # 0 = unlimited

### end CONFIG

# helpers
sanitise_branch() {
  # replace / with - and remove characters unsafe for filenames
  echo "$1" | sed 's#[/ ]#-#g' | sed 's/[^A-Za-z0-9._-]//g'
}

is_blank() {
  # returns true if argument is empty or contains only whitespace
  [ -z "${1//[[:space:]]/}" ]
}

ensure_dirs() {
  mkdir -p "$WORKTREES_DIR"
  mkdir -p "$LOG_DIR"
}

create_worktrees() {
  echo "[orchestrator] Creating worktrees in $WORKTREES_DIR"
  for b in "${BRANCHES[@]}"; do
    if is_blank "$b"; then
      echo " - skipping empty branch entry"
      continue
    fi
    safe=$(sanitise_branch "$b")
    wt="$WORKTREES_DIR/$safe"
    if [ -d "$wt" ]; then
      echo " - worktree exists: $wt"
      continue
    fi
    echo " - creating worktree for branch '$b' at $wt"
    # try create new branch, otherwise add existing
    if git -C "$REPO" rev-parse --verify "$b" >/dev/null 2>&1; then
      git -C "$REPO" worktree add "$wt" "$b"
    else
      git -C "$REPO" worktree add -b "$b" "$wt"
    fi
  done
}

start_session() {
  ensure_dirs
  create_worktrees

  if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    echo "[orchestrator] tmux session '$SESSION_NAME' already exists"
  else
    echo "[orchestrator] Creating tmux session: $SESSION_NAME"
    tmux new-session -d -s "$SESSION_NAME" -n "orchestrator" "bash -lc 'cd $REPO; exec $SHELL'"
  fi

  i=1
  for b in "${BRANCHES[@]}"; do
    if is_blank "$b"; then
      echo " - skipping empty branch entry"
      continue
    fi
    safe=$(sanitise_branch "$b")
    wt="$WORKTREES_DIR/$safe"
    winname="$safe"
    logfile="$LOG_DIR/$safe.log"

    # build the per-window command: a monitored loop that logs and restarts
    # using heredoc-safe quoting
    agent_loop="bash -lc \"cd '$wt' || exit 3; source .env 2>/dev/null || true; echo '[agent start:'\"$(date -Iseconds)\"']' >> '$logfile';
    rcount=0; while true; do
      echo '[agent run:'\"$(date -Iseconds)\"']' >> '$logfile';
      ($COMMAND_TEMPLATE) >> '$logfile' 2>&1 || status=\$?; status=\${status:-\$?}; echo '[agent exit:'\"\$status\"','\"'\$(date -Iseconds)\"']' >> '$logfile';
      rcount=\$((rcount+1)); if [ $MAX_RESTARTS -ne 0 ] && [ \$rcount -gt $MAX_RESTARTS ]; then echo 'max restarts reached' >> '$logfile'; break; fi;
      sleep $RESTART_DELAY;
    done; echo '[agent stopped:'\"$(date -Iseconds)\"']' >> '$logfile'; exec $SHELL\""

    if tmux list-windows -t "$SESSION_NAME" 2>/dev/null | grep -q " $winname"; then
      echo " - window $winname exists, skipping creation"
    else
      echo " - creating window: $winname (worktree: $wt)"
      tmux new-window -t "$SESSION_NAME:" -n "$winname" "$agent_loop"
    fi
    i=$((i+1))
  done

  echo "[orchestrator] Started session. Attach with: tmux attach -t $SESSION_NAME"
}

stop_session() {
  if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    echo "[orchestrator] Killing tmux session: $SESSION_NAME"
    tmux kill-session -t "$SESSION_NAME"
  else
    echo "[orchestrator] No session named $SESSION_NAME found"
  fi
}

status() {
  if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    echo "[orchestrator] Session '$SESSION_NAME' is running. Windows:"
    tmux list-windows -t "$SESSION_NAME"
    echo "\nLogs in: $LOG_DIR"
  else
    echo "[orchestrator] No session named '$SESSION_NAME'"
  fi
}

attach_session() {
  if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    tmux attach -t "$SESSION_NAME"
  else
    echo "[orchestrator] No session to attach. Start first: ./gemini_orchestrator.sh start"
  fi
}

cleanup_worktrees() {
  echo "[orchestrator] WARNING: this will remove worktrees under $WORKTREES_DIR. Press Enter to continue or Ctrl+C to abort."
  read -r
  for b in "${BRANCHES[@]}"; do
    if is_blank "$b"; then
      echo " - skipping empty branch entry"
      continue
    fi
    safe=$(sanitise_branch "$b")
    wt="$WORKTREES_DIR/$safe"
    if [ -d "$wt" ]; then
      echo " - removing worktree $wt"
      git -C "$REPO" worktree remove --force "$wt" || rm -rf "$wt"
    else
      echo " - no worktree found for $b"
    fi
  done
  git -C "$REPO" worktree prune || true
}

print_help() {
  cat <<EOF
Usage: $0 <command>
Commands:
  start    - create worktrees (if needed) and start tmux session with agents
  stop     - stop the tmux session
  status   - show session status and windows
  attach   - attach to the tmux session
  cleanup  - interactively remove created worktrees (DANGEROUS)
  help     - show this help

Configure variables at the top of this script OR export them as environment variables before running.
Examples:
  REPO=~/projects/myrepo BRANCHES="\"feature/A feature/B\"" ./gemini_orchestrator.sh start
  ./gemini_orchestrator.sh stop
EOF
}

# dispatch
cmd=${1:-help}
case "$cmd" in
  start) start_session ;; 
  stop) stop_session ;; 
  status) status ;; 
  attach) attach_session ;; 
  cleanup) cleanup_worktrees ;; 
  help|*) print_help ;;
esac

# End of gemini_orchestrator.sh
