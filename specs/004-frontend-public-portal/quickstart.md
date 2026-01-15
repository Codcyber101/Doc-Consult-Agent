# Quickstart: Frontend Public Portal

**Branch**: `004-frontend-public-portal`

## Development Setup

1.  **Install Dependencies**:
    ```bash
    cd frontend/ui
    pnpm install
    ```

2.  **Environment Variables**:
    Create `frontend/ui/.env.local`:
    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:3000
    NEXT_PUBLIC_COUCHDB_URL=http://localhost:5984
    ```

3.  **Run Development Server**:
    ```bash
    pnpm dev
    ```

## Testing

1.  **Run Unit Tests**:
    ```bash
    pnpm test
    ```

2.  **Open Cypress E2E Dashboard**:
    ```bash
    pnpm cypress:open
    ```

3.  **Simulate Offline Mode**:
    - Open Chrome DevTools.
    - Go to the **Network** tab.
    - Select **Offline** from the throttling dropdown.
    - Verify that the "Local Save" indicator appears in the UI.
