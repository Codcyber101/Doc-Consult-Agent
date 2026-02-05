#!/usr/bin/env bash
# Implements: /specs/001-govassist-ethiopia/spec.md#requirements
# Generated-by: Codex prompt-id: prod-ready-2026-02-04
# Generated-at: 2026-02-04T00:00:00Z
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

"${SCRIPT_DIR}/backup_postgres.sh"
"${SCRIPT_DIR}/backup_minio.sh"
