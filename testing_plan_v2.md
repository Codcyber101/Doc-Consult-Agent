# Comprehensive UI Verification Plan: GovAssist Ethiopia

## 1. Executive Summary
This plan outlines the verification strategy for the "Sovereign Utility" frontend redesign. We will focus on ensuring the new aesthetic is consistent, the "Smart Molecules" (domain components) function correctly, and the critical user journeys (Dashboard -> Wizard) are unbreakable.

**Scope:** `ui/src/components` (UI/Domain), `ui/src/app` (Pages), and integration with Next.js 15+ App Router.

## 2. Testing Layers

### A. End-to-End (E2E) Testing (Priority: High)
*Tool: Cypress*
We will create/update Cypress specs to simulate real user behavior.
*   **`dashboard.cy.ts`**: Verify the Landing Page loads, "Sovereign" greeting appears, Service Cards are clickable, and responsive navigation works.
*   **`wizard-flow.cy.ts`**: Test the new `WizardShell` and `FlowLayout`. Go through a mock Trade License flow (Step 1 -> Upload -> Next).
*   **`components.cy.ts`**: Isolated tests for `DocumentUploadWidget` (drag & drop simulation) and `ProvenanceViewer` (modal opening).

### B. Component Unit & Interaction Testing (Priority: Medium)
*Tool: Jest + React Testing Library* (Need to install)
Since `npm test` is currently just `echo`, we need to set up Jest to test complex logic in isolation.
*   **`ReadinessPanel`**: Verify score calculation logic (mock props -> correct donut chart rotation).
*   **`WizardShell`**: Verify progress bar width calculation based on `currentStep`.
*   **`Button`**: Verify variants render correct Tailwind classes.

### C. Visual Verification (Priority: High - Manual for now)
*Tool: Storybook* (Future) / *Manual Review* (Current)
*   **Typography**: Verify `Outfit` vs `DM Sans` usage.
*   **Theme**: Check Dark Mode behavior (though primarily designed for Light Mode "Sovereign" feel).
*   **Motion**: Verify `framer-motion` entrance animations don't cause layout shifts.

## 3. Implementation Steps

### Step 1: Install Test Dependencies
We need to install Jest and React Testing Library as they are missing from `package.json`.
```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node
```

### Step 2: Configure Jest
Create `jest.config.js` and `jest.setup.js` to handle Next.js environment and aliasing (`@/*`).

### Step 3: Write Critical Cypress Specs
Rewrite `ui/cypress/e2e/dashboard.cy.ts` to match the new `page.tsx` content.

### Step 4: Run & Fix
Execute `npm run test:e2e` and fix any selector issues (e.g., ensuring `data-testid` attributes exist on new components).

## 4. Immediate Action Plan (Actionable)

I will proceed with **Step 3 (Cypress)** immediately as it provides the highest value verification for the current "Dockerized" state without needing to restart containers for dev dependencies (Cypress runs externally against the URL).

1.  **Create `ui/cypress/e2e/sovereign-dashboard.cy.ts`**: Test landing page, typography presence, and service cards.
2.  **Create `ui/cypress/e2e/wizard-smoke.cy.ts`**: Test the `flow/[id]` layout and basic navigation.
3.  **Run Cypress** against the running local container (`http://localhost:3000`).
