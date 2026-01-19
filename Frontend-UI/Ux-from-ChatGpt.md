# GovAssist Ethiopia — Final Frontend UI/UX Plan (Comprehensive, with shadcn/ui)

This is the final, production-ready **frontend UI/UX plan** for GovAssist Ethiopia, explicitly integrating **shadcn/ui** as the UI foundations layer. It’s spec-driven, accessibility-first, Amharic-first, offline-capable, and engineered for safe collaboration with coding agents. Use this as the front-end handbook and checklist for designers, frontend engineers, and AI coding agents.

---

# 1. Executive summary (one paragraph)

Use **shadcn/ui** (Radix + Tailwind primitives) for atomic UI primitives, build a strict domain component layer (Wizard, DocumentUpload, ProcedureCard, ReadinessPanel, ProvenanceViewer) on top, drive every UI contract from `/contracts` (OpenAPI + JSON Schemas), and follow the repo/coding rules in `AGENTS.md`. Prioritize clarity, step-by-step wizards, explicit provenance, offline-first behavior, and WCAG AA accessibility. Ship via Next.js PWA, Storybook for components, and Storybook + Cypress + axe for testing.

---

# 2. Goals & success metrics (frontend-specific)

* **Clarity & success:** 90% task completion in usability tests for key flows (trade license, registration, passport).
* **First-pass readiness:** Readiness score correctly identifies top-3 missing items in ≥95% of pilot cases.
* **Accessibility:** WCAG AA compliance for core flows.
* **Reliability offline:** Offline queue sync success ≥99.9%.
* **Performance:** FCP < 1.5s on modern low-end devices; bundle for 3G/EDGE friendly.
* **Adoption:** Pilot retention ≥ 40% for SMEs who complete flows.

---

# 3. Architecture & stack (frontend layer)

**Primary stack**

* Next.js (App Router) — PWA + SSR where helpful
* React + TypeScript
* Tailwind CSS + design tokens
* shadcn/ui (Radix primitives + Tailwind wrappers) for atomic UI
* Storybook (component dev + visual testing)
* i18next for localization (Amharic primary)
* PouchDB (IndexedDB) for local queue; CouchDB server for sync
* Service Worker (workbox) for caching & sync hooks
* react-hook-form + zod/pajama or zod for form validation (schema-derived)
* image-compression (browser) for client-side upload optimization

**Testing & QA**

* Jest + React Testing Library (unit)
* Cypress (E2E)
* Storybook + Chromatic (visual)
* axe-core (accessibility) integrated in CI

**Observability**

* Sentry (error), custom analytics events to backend (privacy-safe), Prometheus-visible metrics from backend.

---

# 4. Repo & folder structure (frontend-focused)

```
/ui/
  /design/                     # tokens, typography, figma links
    tokens.json
  /web-pwa/
    /components/
      /ui/                     # shadcn-generated primitives (do not heavily edit)
      /domain/                 # domain components: Wizard, Upload, Panel...
    /pages/ or /app/           # Next.js routes
    /lib/                      # client utilities: i18n, api, pouch-sync
    /styles/                   # globals.css, tailwind.css, font loaders
    /locales/                  # en/, am/ JSON files
    /stories/                  # Storybook stories
    /tests/                    # component/unit tests
    service-worker.ts
    manifest.json
```

**Rule:** `/components/ui` (shadcn primitives) kept minimal modifications; all UX logic in `/components/domain`.

---

# 5. Design system & tokens (Figma → Tailwind → shadcn)

**Design tokens**

* Colors, spacing, radii, elevation, typographic scale, motion durations.
* Store tokens in `ui/design/tokens.json` and generate Tailwind variables.

**Typography**

* Primary Amharic font: **Noto Sans Ethiopic** (bundled locally).
* Fallback: Noto Sans / system UI.
* Base size: 16px (mobile-first), large body 18px optional.

**Tailwind config snippets (example)**

```ts
// tailwind.config.ts
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: { primary: "var(--color-primary)", accent: "var(--color-accent)" },
      fontFamily: { body: ["'Noto Sans Ethiopic'", "Noto Sans", "system-ui"] }
    }
  }
};
```

**Design tokens -> CSS variables**
Generate `:root { --color-primary: 215 44% 16%; ... }` for runtime theming.

---

# 6. shadcn/ui integration strategy (practical rules)

1. **Install & initialize** shadcn in the Next.js app (team-run): `npx shadcn@latest init`.
2. **Selective component addition**: only add the primitives you need (button, input, dialog, form, tooltip, progress).
3. **Treat `components/ui` as infra**: do not duplicate or reimplement primitives. Extend them minimally. All domain UI should wrap these primitives in `/components/domain`.
4. **Accessibility**: rely on Radix behaviors via shadcn but always add labels and error messages in domain components.
5. **Visual tests**: create stories for every domain component using Storybook.
6. **Localization**: pass label text via i18n keys; avoid hard-coded strings in primitives.

---

# 7. Core domain components (must-have list)

Implement these domain components (each with Storybook story, unit tests, visual tests):

1. `WizardShell` — question frame, back/next, progress, help button
2. `ProcedureChecklistCard` — step summary, required docs, fees, common failures
3. `TimelineView` — visual timeline with parallel step markers
4. `DocumentUploadWidget` — camera/capture + preview + extraction highlights + quality analyzer
5. `ReadinessPanel` — composite showing score, missing items & CTAs
6. `PrefillEditor` — prefilled form with provenance badges per field
7. `ProvenanceViewer` — modal showing citation bundle + HSM signature metadata
8. `SubmissionTracker` — MESOB submission status & timeline
9. `HumanReviewNotice` — transparent human review status & upload extra docs
10. `ConsentModal` — explicit consent for cloud LLM or MESOB submissions

Each domain component must derive prop types from `/contracts/schemas/*.json` (generate types from schemas).

---

# 8. UX patterns & flows (detailed)

**Task-first landing**

* Grid of tasks; show expected time, online badge (MESOB availability). CTA opens wizard.

**Wizard**

* Single question per screen; large buttons; progress at top.
* "Why needed?" shows ProvenanceViewer with citation bundle.
* Save & Resume: store current wizard state in PouchDB.

**Document Upload**

* Camera overlay with guides for stamps, ID format
* Client-side cropping & compression
* Run quick local heuristics (edge detect, skew) and give precise retake guidance
* Show extracted fields overlay; allow inline edit with provenance

**Readiness & Remediation**

* Donut + list; for each missing item show exact documents, example image, and office details
* "Fix now" suggestions (e.g., take new photo, open template)

**Submission & Tracking**

* If MESOB available: show consent flow → authentication → submission → show application id
* Track via webhooks or polling; update UI timeline

**Human Review**

* Show reviewer delay ETA; allow attaching extra docs and comments
* Show reviewer decisions with provenance

---

# 9. Offline-first & sync UX

* **States:** offline, queued, syncing, synced, failed
* **Local queue UI:** `/my-queue` lists pending submissions with edit/delete before sync
* **Conflict UI:** show server vs local diffs, highlight fields, simple accept/merge
* **Background sync:** on reconnect, sync jobs; show toast notifications

Implementation hints:

* PouchDB local DB with replication to CouchDB
* Use service worker + Background Sync API for resilient uploads
* Keep duplicates detection on client before upload (hash file)

---

# 10. Localization & content strategy

* i18next JSON keys under `/ui/web-pwa/locales/am/`, `/en/`
* All copy flows through localization functions; no hard-coded text
* Use context keys for verbose pages (e.g., `playbook.step.leaseAgreement.help`)
* Professional translation for Amharic; proofreads by local legal/editor reviewers

---

# 11. Accessibility & inclusive design

* WCAG AA baseline: use axe-core in CI
* Keyboard navigation for all interactive flows
* ARIA labels on document upload widget; clear screen reader text for extracted fields
* Color contrast checks; provide high-contrast switch
* Large-tap targets for mobile (44–48px)
* Provide audio guidance option for low-literacy users (optional phase) — separate consent

---

# 12. Performance & progressive enhancement

* SSR for critical pages; client hydration for wizards
* Lazy load provenance viewer, heavy admin canvases
* Client image compression and upload chunking
* Use modern image formats (AVIF/WebP) where mobile supports
* Implement offline-first service worker caching and runtime caching rules

---

# 13. Storybook, tests & agent workflows

**Storybook**

* Stories for all domain components
* Chromatic visual snapshot testing

**Unit & Integration Tests**

* React Testing Library + Jest for domain components
* Contracts tests: validate UI props against `/contracts/schemas` fixture

**E2E**

* Cypress for flows: upload → readiness → prefill → submit
* Accessibility test in CI via `cypress-axe`

**Coding agents**

* Agents must generate components with top-of-file spec citation as per `AGENTS.md`
* Agents generate Storybook story and unit test simultaneously
* Agents must produce `SPEC_MISSING` if binding to a missing contract field

---

# 14. Instrumentation & analytics

Instrument these events (privacy-safe):

* `task.start`, `task.complete`, `wizard.step`, `upload.attempt`, `upload.quality`, `readiness.score`, `submission.attempt`, `submission.result`, `humanReview.requested`
* Send minimal payloads (no PII). If PII needed for analytics pilot, store masked and local.

Design metrics dashboards for:

* Drop-off by wizard step
* Upload quality by device/OS
* First-pass acceptance correlation with readiness score

---

# 15. Design collaboration & handoff

* **Figma**: single source for components and tokens; link tokens to Tailwind tokens
* **Design tokens** published to `ui/design/tokens.json`
* Use Storybook snapshots for dev handoff and Chromatic for review
* Provide component usage docs in `/ui/web-pwa/docs/components.md`

---

# 16. Roadmap & phased deliverables (recommended)

**Phase 0 — Foundations**

* Init Next.js + Tailwind + shadcn, install fonts locally
* Create design tokens and base components (Button, Input, Dialog)
* Storybook baseline

**Phase 1 — Core UX**

* Wizard shell, DocumentUploadWidget, ReadinessPanel
* OCR client integration & extracted field preview
* Local queue (PouchDB) basic integration

**Phase 2 — Submission & MESOB**

* PrefillEditor, Consent flow, MESOB connector UI (staged)
* Submission tracking UI

**Phase 3 — Polish & Accessibility**

* Accessibility sweep, multilocale readiness, performance tuning
* Pilot flows + usability tests

**Phase 4 — Scale**

* Additional flows, admin authoring UI complete, analytics & A/B tests

---

# 17. Acceptance criteria (frontend release-ready)

* All domain components have Storybook stories, unit tests, and accessibility checks
* Wizard flows pass E2E tests for 3 core flows
* Offline queue sync works in simulated poor connectivity tests
* Provenance viewer displays signed artifacts correctly
* No unmasked PII submitted to cloud LLMs in test flows
* Performance targets met on low-end devices (FCP & TTI)

---

# 18. Developer & AGENTS.md additions (frontend rules)

Add a small addendum to `AGENTS.md` to govern frontend agents:

* Agents may add shadcn components via `npx shadcn@latest add <component>` only when referenced by spec.
* Agents must always produce Storybook stories and unit tests for any generated component.
* Agents must localize strings and reference i18n keys; never hard-code text.
* Agents must annotate generated files with spec reference comments.

---

# 19. Example snippets

**ReadinessPanel domain component (simplified)**

```tsx
// Implements: /spec/ux.md#readiness-panel
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export function ReadinessPanel({ score, missing }: { score: number; missing: string[] }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">ዝግጁነት • Readiness</h3>
      <Progress value={score} className="my-3" />
      <p className="text-sm">ድጋፍ: {score}%</p>
      <ul className="mt-2 text-sm space-y-1">
        {missing.map((m) => <li key={m} className="text-amber-700">• {m}</li>)}
      </ul>
      <Button className="mt-3">Fix now</Button>
    </div>
  );
}
```

**Tailwind config tokens (snippet)** included earlier.

---

# 20. Deliverables I will produce immediately (pick one or more)

I can generate any of these now:

1. `ui/design/tokens.json` + `tailwind.config.ts` skeleton for GovAssist palette & Ethiopic fonts.
2. Starter `components/ui/*` (shadcn init) + `/components/domain/WizardShell.tsx` + Storybook stories.
3. `DocumentUploadWidget` domain component skeleton + camera overlay guidance and Storybook story.
4. Storybook + Chromatic config and sample visual tests.
5. Cypress E2E skeleton tests for the three core flows (stubs).
6. AGENTS.md frontend addendum (concrete) and agent prompt templates for component generation.

Tell me which items (numbers) to generate and I’ll produce them here.
