# Implementation Plan: Frontend UI/UX Overhaul

## 1. Understanding
- **Objective**: Completely change the frontend UI/UX and flow of the GovAssist Ethiopia application.
- **Source of Truth**: PRD and `Frontend-UI-design/` reference prototypes.
- **Success Criteria**:
  - [ ] App theme updated to Blue `#1152d4` (Primary).
  - [ ] Typography updated to `Public Sans` and `Noto Sans Ethiopic`.
  - [ ] Root layout includes the new sticky Header.
  - [ ] Dashboard page matches `Frontend-UI-design` prototype.
  - [ ] `Trade License` flow updated to use the new UI/UX patterns.

## 2. Analysis
- **Design Tokens**: `ui/tailwind.config.ts` and `ui/src/app/globals.css` define the current "Emerald" theme.
- **Layout**: `ui/src/app/layout.tsx` and `ui/src/components/layout/AppSidebar.tsx` control the overall structure.
- **Dashboard**: `ui/src/app/page.tsx` is the current landing page.
- **Wizard**: `ui/src/components/common/WizardStepShell.tsx` and `ui/src/components/domain/WizardShell.tsx` (currently inconsistent) are the base for flows.

## 3. Architecture
- **Theme Overhaul**: Update Tailwind config with the new color palette and fonts (`Public Sans`).
- **Shared Layout**: Create a unified shell that includes the new Header and a refined Sidebar.
- **Wizard Standardization**: Fix `WizardShell` to be a robust, prop-driven container for all document flows.
- **Visual Style**: Clean, high-contrast "Citizen Portal" look instead of the previous "Sovereign/Traditional" look.

## 4. Task Breakdown
- Task: [FT-1] Update Design System and Tokens
  - Update `ui/tailwind.config.ts` to replace the "Emerald/Gold" palette with the new "Blue/Slate" palette (`#1152d4`).
  - Update `ui/src/app/globals.css` to redefine CSS variables for background, foreground, and primary colors.
  - Files: `ui/tailwind.config.ts`, `ui/src/app/globals.css`
  - Depends: none
  - Effort: 1
  - Verifies: Tailwind classes use new colors/fonts.

- Task: [FT-2] Implement New Header and Sidebar
  - Create `ui/src/components/layout/Header.tsx` as a sticky top navigation bar with language switcher and user profile.
  - Update `ui/src/components/layout/AppSidebar.tsx` to match the new "Citizen Portal" visual style (slimmer, refined icons).
  - Files: `ui/src/components/layout/Header.tsx`, `ui/src/components/layout/AppSidebar.tsx`
  - Depends: [FT-1]
  - Effort: 2
  - Verifies: Sticky header visible on all pages and sidebar reflects new theme.

- Task: [FT-3] Refactor Dashboard Landing Page
  - Overhaul `ui/src/app/page.tsx` to implement the new hero banner with abstract gradients and updated service tiles.
  - Ensure the "Common Services" section uses the new grid layout from the prototype.
  - Files: `ui/src/app/page.tsx`
  - Depends: [FT-2]
  - Effort: 3
  - Verifies: Landing page matches the new prototype design.

- Task: [FT-4] Standardize and Fix Wizard Component
  - Update `ui/src/components/domain/WizardShell.tsx` to actually receive and use props (`currentStep`, `totalSteps`, `title`, etc.).
  - Apply the new "Blue" visual style to the progress indicators and action buttons.
  - Files: `ui/src/components/domain/WizardShell.tsx`
  - Depends: [FT-1]
  - Effort: 2
  - Verifies: Component correctly renders progress, titles, and children based on props.

- Task: [FT-5] Update Trade License Renewal Flow
  - Refactor `ui/src/app/flows/trade-license/TradeLicenseWizardContent.tsx` to use the fixed `WizardShell`.
  - Update the "Success" screen to match the new "Transmission Successful" UI from the reference code.
  - Files: `ui/src/app/flows/trade-license/TradeLicenseWizardContent.tsx`
  - Depends: [FT-4]
  - Effort: 3
  - Verifies: End-to-end flow uses new styles and "Transmission Successful" UI.

## 5. Dependencies
- **Internal**: `WizardStepShell.tsx`, `Button.tsx`, `AppSidebar.tsx`.
- **External**: `lucide-react`, `framer-motion`, `tailwindcss`.
- **Environment**: Next.js App Router, Node.js environment.

## 6. Risk Assessment
| Risk | Category | Impact | Mitigation |
|------|----------|--------|------------|
| Inconsistent styles across sub-flows | UI/UX | High | Use shared `WizardShell` and `ui/` components. |
| Breaking existing offline logic | Functional | Low | Only modify the view layer; keep business logic/hooks intact. |
| Performance hit with animations | UX | Medium | Use `AnimatePresence` judiciously and test on low-end devices. |
| CSS Variable conflicts | Technical | Low | Prefix new variables or use a scoped theme approach. |

## 7. Verification
- **Build**: Run `cd ui && npm run build` to verify compilation.
- **Lint**: Run `cd ui && npm run lint` to check for style issues.
- **Manual Scenarios**:
  - Landing on Dashboard: Check colors, header, and service tiles.
  - Navigate to Trade License: Walk through steps, check progress bar.
  - Final Step: Verify the "Transmission Successful" screen.

## Complexity Assessment
- **Tier**: Complex
- **Estimated Effort**: 1-2 weeks (for full app), 3-4 days (for core pages/flow)
- **Risk Level**: Medium
