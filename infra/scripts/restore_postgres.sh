#!/usr/bin/env bash
# Implements: /specs/001-govassist-ethiopia/spec.md#requirements
# Generated-by: Codex prompt-id: prod-ready-2026-02-04
# Generated-at: 2026-02-04T00:00:00Z
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: restore_postgres.sh /path/to/postgres-<timestamp>.dump"
  exit 1
fi

BACKUP_FILE="$1"
if [[ ! -f "${BACKUP_FILE}" ]]; then
  echo "Backup file not found: ${BACKUP_FILE}"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${INFRA_DIR}"

docker compose -f docker-compose.prod.yml cp "${BACKUP_FILE}" postgres:/tmp/restore.dump

docker compose -f docker-compose.prod.yml exec -T postgres \
  pg_restore -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" --clean --if-exists /tmp/restore.dump

docker compose -f docker-compose.prod.yml exec -T postgres rm -f /tmp/restore.dump

echo "Postgres restore completed from ${BACKUP_FILE}"
