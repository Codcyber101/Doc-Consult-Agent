<!--
Implements: /specs/001-govassist-ethiopia/spec.md#requirements
Generated-by: Codex prompt-id: prod-ready-2026-02-04
Generated-at: 2026-02-04T00:00:00Z
-->
# Release Checklist

1. Ensure `infra/.env` is populated with production secrets.
2. Run `docker compose -f infra/docker-compose.prod.yml build`.
3. Run `infra/scripts/smoke_test.sh` against the production environment.
4. Verify `/metrics` is reachable and includes:
   - `http_request_duration_ms`
   - `ocr_job_total`
   - `compliance_evaluation_total`
   - `mesob_submission_total`
5. Verify backups:
   - `infra/scripts/backup_all.sh`
   - Confirm output in `infra/backups/`
6. Verify admin endpoints require auth.
7. Tag release and record image digests.
