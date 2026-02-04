#!/usr/bin/env bash
# Implements: /specs/001-govassist-ethiopia/spec.md#requirements
# Generated-by: Codex prompt-id: prod-ready-2026-02-04
# Generated-at: 2026-02-04T00:00:00Z
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
BACKUP_DIR="${BACKUP_DIR:-${INFRA_DIR}/backups/postgres}"

mkdir -p "${BACKUP_DIR}"

timestamp="$(date -u +"%Y%m%dT%H%M%SZ")"
backup_file="${BACKUP_DIR}/postgres-${timestamp}.dump"

cd "${INFRA_DIR}"

docker compose -f docker-compose.prod.yml exec -T postgres \
  pg_dump -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" -F c -f "/tmp/backup.dump"

docker compose -f docker-compose.prod.yml cp postgres:/tmp/backup.dump "${backup_file}"

docker compose -f docker-compose.prod.yml exec -T postgres rm -f /tmp/backup.dump

echo "Postgres backup created at ${backup_file}"
