# Doc-Consult-Agent

GovAssist Ethiopia (GAE) — A specialized platform for document consultation, compliance checking, and policy research.

## Project Structure

- `/specs/`: Authoritative specifications (Single Source of Truth).
- `/agents/`: Python-based AI agents (Intelligence Plane).
- `/backend/`: NestJS control plane (API & Orchestration).
- `/ui/`: Frontend application (Public Portal & Admin Dashboard).
- `/contracts/`: OpenAPI and JSON Schema contracts.
- `/policy-registry/`: Authoritative rules and playbooks.
- `/infra/`: Infrastructure as Code and Docker configurations.

## Getting Started

### AI Agents & Contributors
Please read **[AGENTS.md](./AGENTS.md)** before starting any work. It contains the normative rules, developer flows, and operational commands for this repository.

### Quick Start
1. **Infrastructure:** `make -C infra up`
2. **Backend:** `cd backend && npm install && npm run start:dev`
3. **Agents:** `cd agents && pip install -r requirements.txt && python src/main.py`
4. **UI:** `cd ui && npm install && npm run dev`

## Status Tracking
Current active worktrees and agent personas are tracked in **[WORKTREES.md](./WORKTREES.md)**.
