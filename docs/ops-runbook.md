<!--
Implements: /specs/001-govassist-ethiopia/spec.md#requirements
Generated-by: Codex prompt-id: prod-ready-2026-02-04
Generated-at: 2026-02-04T00:00:00Z
-->
# Operations Runbook

## Production Start

```bash
cd infra
docker compose -f docker-compose.prod.yml up -d --build
```

## Smoke Checks

1. UI reachable on port 3000.
2. Backend reachable on port 3001.
3. Temporal UI reachable on port 8233.
4. Weaviate reachable on port 8080.

## Common Failures

1. Backend fails fast in production:
   - Check required env vars in `infra/.env`.
2. MinIO auth errors:
   - Confirm `MINIO_ROOT_USER` and `MINIO_ROOT_PASSWORD` match the production `.env`.
3. Temporal connection failures:
   - Confirm `TEMPORAL_HOST` for agents and backend.

## Backup and Restore

See `docs/backup-restore.md`.

## Scheduled Backups

Install daily backups (02:00 UTC):

```bash
cd infra
./scripts/install_backup_cron.sh
```

## Smoke Tests

```bash
cd infra
./scripts/smoke_test.sh
```
