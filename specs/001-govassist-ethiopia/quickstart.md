# GovAssist Ethiopia (GAE) Quickstart

## Prerequisites
- Node.js v20+
- Python 3.11+
- Docker & Docker Compose
- Postgres Client
- MinIO Client (mc)

## Environment Setup

1. **Clone and Install**:
   ```bash
   git clone <repo-url>
   cd govassist-ethiopia
   npm install      # Root dependencies
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Start Infrastructure**:
   ```bash
   docker-compose up -d postgres minio redis temporal
   ```

3. **Initialize Database**:
   ```bash
   npm run db:migrate
   npm run db:seed  # Loads initial Policy Registry and Users
   ```

4. **Start Backend (NestJS)**:
   ```bash
   cd backend
   npm run start:dev
   ```

5. **Start Frontend (Next.js)**:
   ```bash
   cd frontend
   npm run dev
   ```

## Running Tests

- **Unit Tests**: `npm run test`
- **E2E Tests**: `npm run test:e2e`
- **Policy Verification**: `npm run test:policies` (Runs compliance checks against test cases)

## Development Workflow
1. Create a feature branch `git checkout -b feature/xyz`.
2. Update `contracts/` if API changes.
3. Implement Backend logic in `backend/src`.
4. Implement Frontend UI in `frontend/src`.
5. Run verification `npm run verify`.
6. Push and create PR.
