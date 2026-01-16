#!/usr/bin/env bash
# ensure_git_exclude.sh
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
EXCLUDE="$REPO/.git/info/exclude"

grep -Fq "GEMINI.md" "$EXCLUDE" 2>/dev/null || printf "\n# ignore generated agent files\nGEMINI.md\n.agent-local/\n" >> "$EXCLUDE"
echo "Ensured local git excludes at $EXCLUDE"
