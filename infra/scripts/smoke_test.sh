#!/usr/bin/env bash
# Implements: /specs/001-govassist-ethiopia/spec.md#requirements
# Generated-by: Codex prompt-id: prod-ready-2026-02-04
# Generated-at: 2026-02-04T00:00:00Z
set -euo pipefail

UI_URL="${UI_URL:-http://localhost:3000}"
BACKEND_URL="${BACKEND_URL:-http://localhost:3001}"

function require_cmd() {
  if command -v "$1" >/dev/null 2>&1; then
    return 0
  fi
  return 1
}

if require_cmd curl; then
  FETCH="curl -fsS"
elif require_cmd wget; then
  FETCH="wget -qO-"
else
  echo "curl or wget is required for smoke tests."
  exit 1
fi

echo "Checking UI: ${UI_URL}"
${FETCH} "${UI_URL}" >/dev/null

echo "Checking backend docs: ${BACKEND_URL}/api/docs"
${FETCH} "${BACKEND_URL}/api/docs" >/dev/null

echo "Checking metrics: ${BACKEND_URL}/metrics"
${FETCH} "${BACKEND_URL}/metrics" | grep -q "http_request_duration_ms"

echo "Smoke tests passed."
