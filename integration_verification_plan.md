# Integration Verification Plan

## 1. Component Verification
- [ ] **Backend**: Execute unit and integration tests using Jest.
- [ ] **Agents**: Execute unit tests using Pytest (mocking external dependencies).
- [ ] **UI**: Execute E2E tests using Cypress (ensuring connectivity to backend).

## 2. System Health Check (Integration)
- [ ] **Docker Services**: Ensure all containers (`backend`, `agents`, `ui`, `postgres`, `redis`, `minio`, `temporal`, `weaviate`) are up and healthy.
- [ ] **Connectivity**:
    - Backend -> Database (Postgres)
    - Backend -> Minio
    - Agents -> Temporal
    - Agents -> Weaviate

## 3. Action Items
1.  **Backend**: Run `npm install && npm test` in `backend/`.
2.  **Agents**: Install dependencies and run `pytest` in `agents/`.
3.  **UI**: Add `test:e2e` script to `ui/package.json` and run Cypress.
4.  **Integration Script**: Create a `scripts/health_check.sh` to verify service availability via `curl` and `docker ps`.
