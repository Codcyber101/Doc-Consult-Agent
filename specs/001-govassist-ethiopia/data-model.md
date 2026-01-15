# Data Model: GovAssist Ethiopia (GAE)

## Core Entities

### User
Represents a citizen or SME owner interacting with the system.
- **id**: UUID (Primary Key)
- **auth_id**: String (Keycloak/Fayda ID)
- **profile**: JSONB (Name, Contact, Preferences)
- **consent_status**: Boolean (Explicit consent for PII/MESOB)
- **created_at**: Timestamp
- **updated_at**: Timestamp

### Policy
A versioned regulation or rule stored in the registry.
- **id**: UUID
- **title**: String
- **jurisdiction**: String (e.g., "Addis Ababa", "Federal")
- **version**: String (SemVer)
- **effective_date**: Date
- **content**: YAML (The actual rules and logic)
- **status**: Enum (DRAFT, APPROVED, DEPRECATED)
- **test_cases**: JSONB (CI/CD verification data)

### Playbook
A procedural guide for a specific government service.
- **id**: UUID
- **service_type**: String (e.g., "TRADE_LICENSE", "PASSPORT")
- **jurisdiction**: String
- **steps**: JSONB (Ordered list of steps, requirements, fees)
- **version**: String
- **policy_ref_id**: UUID (Foreign Key to Policy)

### Document
An uploaded file associated with a user and a job.
- **id**: UUID
- **user_id**: UUID (FK)
- **job_id**: UUID (FK)
- **storage_path**: String (MinIO path)
- **mime_type**: String
- **upload_timestamp**: Timestamp
- **checksum**: String (SHA-256)

### Analysis
The result of OCR and compliance processing on a document.
- **id**: UUID
- **document_id**: UUID (FK)
- **ocr_data**: JSONB (Extracted text, bounding boxes, confidence)
- **compliance_report**: JSONB (Pass/Fail, Issues, Citations)
- **readiness_score**: Integer (0-100)
- **pii_map**: JSONB (Locations of redacted PII for rehydration)
- **provenance**: JSONB (Agent IDs, timestamps, models used)

### Submission
A record of an application submitted to an external portal (MESOB).
- **id**: UUID
- **user_id**: UUID (FK)
- **application_package_id**: UUID
- **portal_submission_id**: String (External ID)
- **status**: Enum (PENDING, SUBMITTED, ACCEPTED, REJECTED, APPROVED)
- **metadata**: JSONB (Webhooks, raw external status)
- **submitted_at**: Timestamp

### AuditEvent
Immutable log of system actions.
- **id**: UUID
- **timestamp**: Timestamp
- **actor_id**: String (User ID or Agent ID)
- **action_type**: String
- **resource_id**: UUID
- **details**: JSONB (Encrypted/Masked details)
- **signature**: String (HSM Signature)

## Relationships

- **User** 1:N **Document**
- **User** 1:N **Submission**
- **Policy** 1:N **Playbook**
- **Document** 1:1 **Analysis**
- **Submission** 1:N **AuditEvent**

## Storage Strategy

- **PostgreSQL**: Stores all entities above (metadata).
- **MinIO**: Stores actual file content for `Document` and large JSON blobs for `ocr_data` if needed.
- **PouchDB**: Replicates `User`, `Playbook`, and user's own `Document`/`Analysis` records to the client device for offline access.
