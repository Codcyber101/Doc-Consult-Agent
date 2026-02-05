#!/usr/bin/env bash
# Implements: /specs/001-govassist-ethiopia/spec.md#requirements
# Generated-by: Codex prompt-id: prod-ready-2026-02-04
# Generated-at: 2026-02-04T00:00:00Z
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: restore_minio.sh /path/to/minio-<timestamp>"
  exit 1
fi

BACKUP_PATH="$1"
if [[ ! -d "${BACKUP_PATH}" ]]; then
  echo "Backup path not found: ${BACKUP_PATH}"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${INFRA_DIR}"

docker run --rm \
  --network "${COMPOSE_PROJECT_NAME:-infra}_default" \
  -e MINIO_ROOT_USER="${MINIO_ROOT_USER}" \
  -e MINIO_ROOT_PASSWORD="${MINIO_ROOT_PASSWORD}" \
  -v "${BACKUP_PATH}:/backup" \
  minio/mc \
  sh -c "mc alias set local http://minio:9000 \"${MINIO_ROOT_USER}\" \"${MINIO_ROOT_PASSWORD}\" && mc mirror --overwrite /backup local/"

echo "MinIO restore completed from ${BACKUP_PATH}"
