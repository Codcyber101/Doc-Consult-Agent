# Data Model: GAE RAG Agent

## Entities

### PolicyDraft
Represents a researched policy waiting for admin approval.
- `id`: UUID (Primary Key)
- `title`: String
- `jurisdiction`: String (e.g., "Addis Ababa", "Federal")
- `content`: JSON (Valid Policy YAML structure)
- `source_bundle_id`: UUID (Reference to SourceBundle)
- `confidence_score`: Float (0.0 - 1.0)
- `status`: Enum (DRAFT, PENDING_REVIEW, APPROVED, REJECTED)
- `created_at`: Timestamp
- `updated_at`: Timestamp

### RegulationSnippet
A discrete chunk of legal text indexed for RAG.
- `id`: UUID (Primary Key)
- `document_id`: String (e.g., Proclamation number)
- `content`: Text (Amharic/English)
- `metadata`: JSON (Page number, Section, Effective Date)
- `vector_embedding`: Vector (1536d or similar)
- `created_at`: Timestamp

### SourceBundle
A collection of snippets used for a specific research task or RAG response.
- `id`: UUID (Primary Key)
- `snippets`: List<UUID> (References to RegulationSnippet)
- `task_id`: String (Internal research/analysis ID)
- `created_at`: Timestamp

### Citation
A link between a generated summary claim and a snippet.
- `id`: UUID (Primary Key)
- `claim_text`: String
- `snippet_id`: UUID (Reference to RegulationSnippet)
- `analysis_id`: UUID (Reference to the user session/analysis)
- `is_verified`: Boolean

## Relationships
- `PolicyDraft` belongs to a `SourceBundle`.
- `SourceBundle` contains many `RegulationSnippet`.
- `Citation` links a `RegulationSnippet` to a specific claim.
- `Analysis` (existing) will have many `Citation`.
