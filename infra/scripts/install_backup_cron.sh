#!/usr/bin/env bash
# Implements: /specs/001-govassist-ethiopia/spec.md#requirements
# Generated-by: Codex prompt-id: prod-ready-2026-02-04
# Generated-at: 2026-02-04T00:00:00Z
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_SCRIPT="${SCRIPT_DIR}/backup_all.sh"

if [[ ! -x "${BACKUP_SCRIPT}" ]]; then
  echo "Backup script not executable: ${BACKUP_SCRIPT}"
  exit 1
fi

CRON_LINE="0 2 * * * ${BACKUP_SCRIPT} >> ${SCRIPT_DIR}/backup.log 2>&1"

(
  crontab -l 2>/dev/null | grep -v "${BACKUP_SCRIPT}" || true
  echo "${CRON_LINE}"
) | crontab -

echo "Installed daily backup cron at 02:00 UTC."
