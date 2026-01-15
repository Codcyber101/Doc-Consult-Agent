# Research: Frontend Public Portal

**Branch**: `004-frontend-public-portal`

## Findings & Decisions

### 1. PWA & Service Worker
- **Decision**: Use `next-pwa` with a custom `workbox` configuration for background sync.
- **Rationale**: Provides the best integration with Next.js and handles the required offline preparation and background synchronization logic specified in FR-004 and FR-005.
- **Alternatives Considered**: Manual Service Worker implementation (too error-prone), Vite-PWA (not applicable to Next.js).

### 2. Offline Storage Strategy
- **Decision**: Hybrid use of `Dexie` (for local draft forms) and `PouchDB` (for playbook sync).
- **Rationale**: Dexie provides a clean Promise-based API for IndexedDB, ideal for wizard state. PouchDB's native replication with CouchDB simplifies the synchronization of the procedural playbooks.
- **Alternatives Considered**: Raw IndexedDB (too low-level), LocalStorage (size limits and lack of async support).

### 3. Amharic Localization
- **Decision**: Use `i18next` with `react-i18next` and a JSON-based translation store.
- **Rationale**: Industry standard for React/Next.js. Supports complex pluralization and dynamic locale switching without page reloads.
- **Alternatives Considered**: Next.js native i18n (limited client-side flexibility for runtime switching).

### 4. Document Intelligence Visual Feedback
- **Decision**: Use SVG overlays on a Canvas-based document preview.
- **Rationale**: Allows for high-performance rendering of bounding boxes and confidence highlights over scanned documents (PDF/Images) without the overhead of heavy DOM manipulation.
- **Alternatives Considered**: Absolute-positioned DIVs (harder to scale with zoom/pinch).

## Best Practices
- **Mobile-First**: Tailwind's `sm:`, `md:` breakpoints will be used to ensure the portal is optimized for small screens first.
- **Accessibility**: ARIA labels and semantic HTML are mandatory to support low-literacy users and screen readers.
