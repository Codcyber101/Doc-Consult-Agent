# AGENTS.md (Backend Subpackage)

**Role:** NestJS Control Plane & API Gateway
**Parent:** `/AGENTS.md` (Inherits all normative rules)

---

## Local Commands

- **Install:** `npm install`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Test:** `npm run test`
- **Dev mode:** `npm run start:dev`

---

## Conventions

- **Framework:** NestJS (TypeScript).
- **API Documentation:** Swagger/OpenAPI (mapped from `/contracts/openapi/`).
- **Database:** TypeORM with PostgreSQL.
- **Queueing:** BullMQ with Redis.
- **Workflow:** Implement Temporal workers for orchestration if needed.

---

## Directory Structure

- `src/api`: Controller and DTO layer.
- `src/modules`: Core business logic and services.
- `src/models`: Database entities.
- `src/workflows`: Temporal workflow definitions.
