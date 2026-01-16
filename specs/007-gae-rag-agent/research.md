# Research: GAE RAG Agent

## Decision 1: Hybrid Search Strategy (BM25 + Vector)
- **Decision**: Use Weaviate for Vector search and Elasticsearch (or Weaviate's native BM25) for keyword search.
- **Rationale**: Legal documents often use specific technical terms (proclamation numbers, specific dates) that vector embeddings might miss. BM25 ensures high recall for exact legal references, while vector search handles semantic intent.
- **Alternatives considered**: Vector-only search (rejected for low recall on exact legal IDs).

## Decision 2: PII Masking for Amharic
- **Decision**: Implement a custom PII masking layer using a combination of Presidio (for common patterns) and Amharic-specific regex/NER models for names and regional addresses.
- **Rationale**: Standard PII tools have limited support for Amharic. A hybrid approach ensures sovereignty by tokenizing PII locally before cloud inference.
- **Alternatives considered**: Full local LLM for summarization (rejected due to latency/hardware constraints for pilot).

## Decision 3: Citation Auditing Pattern
- **Decision**: Use a "Self-Correction" loop where a separate LLM call (or a deterministic check) verifies that every claim in the summary maps back to a retrieved snippet's ID and text.
- **Rationale**: Prevents hallucination by making citations a hard constraint of the generation process.
- **Alternatives considered**: Implicit citations in prompt (rejected as too unreliable for legal guidance).

## Decision 4: PRA YAML Generation
- **Decision**: Use LangGraph to orchestrate a multi-step research flow: Search -> Extract -> Validate -> Generate YAML.
- **Rationale**: Research is an iterative process. LangGraph allows the agent to "go back" and fetch more data if the validation step fails.
- **Alternatives considered**: Single-shot LLM research (rejected due to poor accuracy on complex directives).
