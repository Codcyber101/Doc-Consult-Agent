<!--
Implements: /specs/001-govassist-ethiopia/spec.md#requirements
Generated-by: Codex prompt-id: prod-ready-2026-02-04
Generated-at: 2026-02-04T00:00:00Z
-->
# Backup and Restore

This runbook covers Postgres and MinIO backups for the production compose stack.

## Postgres

Backup:

```bash
cd infra
export POSTGRES_USER=...
export POSTGRES_PASSWORD=...
export POSTGRES_DB=...
./scripts/backup_postgres.sh
```

Restore:

```bash
cd infra
export POSTGRES_USER=...
export POSTGRES_PASSWORD=...
export POSTGRES_DB=...
./scripts/restore_postgres.sh /path/to/postgres-<timestamp>.dump
```

## MinIO

Backup:

```bash
cd infra
export MINIO_ROOT_USER=...
export MINIO_ROOT_PASSWORD=...
./scripts/backup_minio.sh
```

Restore:

```bash
cd infra
export MINIO_ROOT_USER=...
export MINIO_ROOT_PASSWORD=...
./scripts/restore_minio.sh /path/to/minio-<timestamp>
```

## Recovery Objectives

- Target RPO: 24 hours
- Target RTO: 4 hours

## Scheduled Backups

Install daily backups (02:00 UTC):

```bash
cd infra
./scripts/install_backup_cron.sh
```
