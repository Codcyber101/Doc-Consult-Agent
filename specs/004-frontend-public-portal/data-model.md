# Data Model: Frontend Public Portal

**Branch**: `004-frontend-public-portal`

## Client-Side Entities (IndexedDB / PouchDB)

### LocalStep
*Stored in Dexie (IndexedDB)*

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Composite key: `playbookId` + `stepIndex` |
| `playbookId` | String | Reference to the service playbook |
| `data` | JSON | Form data entered by the user |
| `status` | Enum | `DRAFT`, `READY`, `SYNCED` |
| `updatedAt` | Timestamp | Last modified time |

### SyncQueueItem
*Stored in Dexie (IndexedDB)*

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary Key |
| `action` | Enum | `SAVE_STEP`, `UPLOAD_DOC`, `SUBMIT_PORTAL` |
| `payload` | JSON | The data to be sent to the server |
| `retryCount` | Integer | Number of failed sync attempts |
| `priority` | Integer | Execution order |

### UserPreference
*Stored in Dexie (IndexedDB)*

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Constant `current_user` |
| `language` | Enum | `am`, `en` |
| `jurisdiction` | JSON | Selected `{region, city, subCity}` |
| `theme` | String | `light`, `dark` |

## Components State (Zustand / Context)
- **WizardState**: Tracks current step index and validation progress.
- **AnalysisState**: Temporary storage for server-side OCR and readiness results.
