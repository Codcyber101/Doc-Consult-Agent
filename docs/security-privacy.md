# Security & Privacy Audit: PDPP Mapping

**Reference**: Ethiopian Data Protection Proclamation (PDPP) No. 1321/2024  
**Status**: Certified Prototype  
**Last Updated**: 2026-01-12

## 1. Principles of Personal Data Processing

| Principle | System Implementation | Proclamation Alignment |
|-----------|-----------------------|-------------------------|
| **Lawfulness & Fairness** | Explicit `ConsentModal` required before any PII rehydration or portal submission. | Art. 5(1)(a) |
| **Purpose Limitation** | PII is only extracted for the specific purpose of completing government forms. | Art. 5(1)(b) |
| **Data Minimization** | `SafetyAgent` masks all PII before any non-sovereign (cloud) LLM processing. | Art. 5(1)(c) |
| **Accuracy** | Human-in-the-loop `ReviewQueue` allows for manual correction of AI extraction errors. | Art. 5(1)(d) |
| **Storage Limitation** | MinIO PII storage configured with short TTLs (default 72h). | Art. 5(1)(e) |
| **Integrity & Confidentiality** | All artifacts HSM-signed; Merkle-anchored audit logs ensure non-repudiation. | Art. 5(1)(f) |

## 2. Sovereign Infrastructure (Data Residency)

All primary processing zones are designated as **Sovereign Zones**, ensuring no raw PII leaves the jurisdiction:

- **PII Storage**: Local MinIO instance (Sovereign Ethiopia).
- **OCR Engine**: Tesseract v5 (Local Execution).
- **Metadata DB**: PostgreSQL (Sovereign Ethiopia).
- **Audit Logs**: Signed event chain (Local Kafka/EventStore).

## 3. The Safety Agent (Masking Flow)

The `SafetyAgent` serves as the primary gateway for privacy compliance:

1. **Detection**: Uses Amharic/English regex and NER to identify phone numbers, names, and IDs.
2. **Tokenization**: Replaces PII with generic tokens (e.g., `[MASKED_NAME]`).
3. **Egress Control**: Only masked data is permitted to exit the sovereign zone for augmented research via cloud models.

## 4. Legal Non-Repudiation

GAE ensures that all compliance decisions are legally defensible:

- **Digital Signatures**: Every `ComplianceReport` is signed using an HMAC/HSM wrapper.
- **Audit Anchoring**: Daily Merkle root hashes are produced to prove the integrity and order of system activities.
- **Provenance**: Every data field includes a provenance link back to the original source document and processing agent.
