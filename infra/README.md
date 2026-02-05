# Shared Infrastructure

This directory contains the canonical Docker Compose configuration for the GovAssist project.
It is designed to support multiple git worktrees sharing a single set of running services (database, queues, etc.), while allowing code to be hot-swapped.

## Prerequisites

- Docker
- Docker Compose

## Usage

Run all commands from this directory (`infra/`).

### Start Services

```bash
make up
```

This will:
1. Build images if they don't exist (using fixed names `govassist-backend:dev`, etc.).
2. Start all infrastructure services (Postgres, Redis, MinIO, Temporal, Weaviate).
3. Start application services (Backend, UI, Agents) with source code mounted from the relative directories (`../backend`, `../ui`, etc.).

### Stop Services

```bash
make down
```

### View Logs

```bash
make logs
```

### Rebuild Images

If you change `package.json` or `Dockerfile`, you need to rebuild:

```bash
make build
```

## Production Compose

Use the production compose file with an `.env` file in `infra/` that sets at least:

- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- `MINIO_ROOT_USER`, `MINIO_ROOT_PASSWORD`
- `WEAVIATE_API_KEYS`

Example:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

## Backups

Backup scripts live in `infra/scripts/`:

- `backup_postgres.sh`
- `restore_postgres.sh`
- `backup_minio.sh`
- `restore_minio.sh`
- `backup_all.sh`
- `install_backup_cron.sh`
- `smoke_test.sh`

## Architecture

- **Context**: The build context is set to the respective directories (`../backend`, `../ui`).
- **Volumes**:
  - Source code is mounted into containers to enable hot-reloading (e.g. `../backend:/app`).
  - `node_modules` are preserved in the container using anonymous volumes to prevent host-OS mismatches.
  - Data volumes are named (e.g., `govassist-postgres-data`) so they persist across restarts and potential directory moves.
