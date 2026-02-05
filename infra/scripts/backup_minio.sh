#!/usr/bin/env bash
# Implements: /specs/001-govassist-ethiopia/spec.md#requirements
# Generated-by: Codex prompt-id: prod-ready-2026-02-04
# Generated-at: 2026-02-04T00:00:00Z
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
BACKUP_DIR="${BACKUP_DIR:-${INFRA_DIR}/backups/minio}"

mkdir -p "${BACKUP_DIR}"

timestamp="$(date -u +"%Y%m%dT%H%M%SZ")"
backup_path="${BACKUP_DIR}/minio-${timestamp}"

cd "${INFRA_DIR}"

docker run --rm \
  --network "${COMPOSE_PROJECT_NAME:-infra}_default" \
  -e MINIO_ROOT_USER="${MINIO_ROOT_USER}" \
  -e MINIO_ROOT_PASSWORD="${MINIO_ROOT_PASSWORD}" \
  -v "${BACKUP_DIR}:/backup" \
  minio/mc \
  sh -c "mc alias set local http://minio:9000 \"${MINIO_ROOT_USER}\" \"${MINIO_ROOT_PASSWORD}\" && mc mirror --overwrite local/ /backup/minio-${timestamp}"

echo "MinIO backup created at ${backup_path}"
