# Implementation Plan: GovAssist Ethiopia (GAE)

**Branch**: `001-govassist-ethiopia` | **Date**: 2026-01-11 | **Spec**: [specs/001-govassist-ethiopia/spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-govassist-ethiopia/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement the GovAssist Ethiopia (GAE) platform, a sovereign-first, multi-agent system for guiding citizens through government procedures. The system features a Next.js PWA frontend, a hybrid NestJS/FastAPI backend, deterministic policy enforcement via a registry, and durable workflow orchestration using Temporal and LangGraph.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (Node.js 20+), Python 3.11+  
**Primary Dependencies**: NestJS, React, Next.js, FastAPI, LangGraph, Temporal SDKs  
**Storage**: PostgreSQL (Metadata), MinIO (Documents), PouchDB/CouchDB (Offline Sync), Weaviate (Vector)  
**Testing**: Jest (Backend/UI), Pytest (Agents), Cypress (E2E)  
**Target Platform**: Linux containers (Docker/K8s), PWA for clients  
**Project Type**: Full-stack (Web + Mobile PWA + Microservices)  
**Performance Goals**: <5s P95 latency for reads, 99.9% offline sync success  
**Constraints**: Sovereign PII storage (no unmasked cloud LLM), offline-first capability  
**Scale/Scope**: 25k users (pilot), high-reliability document processing  

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Code Quality**: NestJS and TypeScript enforce strong typing and structure. Python agents use standard patterns.
- **Testing**: Plan includes Unit (Jest/Pytest), Integration, and E2E (Cypress) layers.
- **UX**: PWA ensures consistent offline/online experience. Amharic-first design.
- **Performance**: PouchDB handles local latency. Temporal handles long-running reliability.
- **Security**: Sovereign storage (MinIO) and HSM signing align with Zero Trust and Compliance principles.

## Project Structure

### Documentation (this feature)

```text
specs/001-govassist-ethiopia/
├── plan.md              # This file
├── research.md          # Technical stack decisions
├── data-model.md        # Core entity definitions
├── quickstart.md        # Setup and run instructions
├── contracts/           # OpenAPI and JSON Schemas
└── tasks.md             # Implementation tasks
```

### Source Code (repository root)

```text
govassist-ethiopia/
├── spec/                          # Immutable PRD and Specs
├── contracts/                     # API and Schema Definitions
│   ├── openapi/
│   └── schemas/
├── backend/                       # NestJS Control Plane
│   ├── src/
│   │   ├── api/
│   │   ├── workflows/
│   │   └── modules/
│   └── test/
├── agents/                        # Python AI/ML Agents
│   ├── src/
│   │   ├── document_analyzer/
│   │   ├── compliance_agent/
│   │   └── regulations/
│   └── tests/
├── policy-registry/               # YAML Policy Definitions
│   ├── addis-ababa/
│   └── federal/
├── ui/                            # Next.js PWA
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   └── public/
├── infra/                         # Docker/K8s/Terraform
└── tests/                         # End-to-End Tests
```

**Structure Decision**: Multi-service Monorepo. Separates the "Control Plane" (NestJS) from the "Intelligence Plane" (Python Agents) and the "User Interface" (Next.js), while keeping Contracts and Policies central.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Multiple Backends (Node+Python) | NestJS for robust app logic, Python for rich AI/ML ecosystem | Single Node.js backend lacks mature AI/ML libraries; Single Python backend lacks NestJS's robust enterprise patterns. |
| Temporal + LangGraph | Temporal for process durability (weeks), LangGraph for agent reasoning (seconds) | Using only one compromises either long-term reliability or complex reasoning capabilities. |