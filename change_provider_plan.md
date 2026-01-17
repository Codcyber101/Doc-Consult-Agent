# Implementation Plan: Switch Model Provider to Groq

**Branch**: `feat-backend` | **Date**: 2026-01-17
**Goal**: Migrate all AI agents from OpenAI (or mock) to Groq using `langchain-groq` and secure API keys using `.env`.

## Summary
Replace `langchain-openai` with `langchain-groq` across the agent codebase. Centralize LLM instantiation in a common utility (`agents/src/common/llm.py`) and update the Regulation Expert (RAG) agent to use this real LLM implementation. Secure sensitive credentials using environment variables.

## Technical Context
**Library**: `langchain-groq`
**Model**: `llama-3.1-70b-versatile`
**Security**: All API keys must be loaded via `python-dotenv` from a `.env` file and never hardcoded.

## Steps

### Phase 1: Infrastructure (Completed)
### Phase 2: Environment Setup (Completed)
### Phase 3: Agent Integration (Completed)
### Phase 4: Policy Research Agent Integration (Completed)

## Verification
- Run tests to ensure Groq is called (mocking the network call in unit tests).
- Verify `.env` is correctly loaded.
