# Frontend Design Plan: GovAssist Ethiopia

## 1. Aesthetic Direction: "Sovereign Utility"
**Purpose:** To instill trust and guide users clearly through complex tasks.
**Tone:** Authoritative yet helpful. "Wizard-first, Chat-second".
**Differentiation:** Unlike generic gov portals, this interface focuses on *guidance* and *readiness* before submission.

### Visual Identity
*   **Color Palette:**
    *   **Primary:** `Ethiopian Emerald` (#006B3F) - Used for primary actions, active states, and headers.
    *   **Secondary:** `Abyssinian Gold` (#FDB813) - Used for highlights, verification badges, and focus rings.
    *   **Accent:** `Red Earth` (#D94E41) - For errors and "Action Required".
    *   **Neutral:** `Slate` (50-900) - For text and backgrounds to maintain focus.
    *   **Background:** `Off-White` (#F8FAFC) - Reduces eye strain compared to pure white.

*   **Typography:**
    *   **English:** `Inter` - Clean, modern, highly legible.
    *   **Amharic:** `Noto Sans Ethiopic` - The standard for digital Amharic.
    *   **Scale:** Large, readable headings (H1/H2) with clear hierarchy.

*   **Iconography:**
    *   Simple, outline-style icons (Lucide React) for UI elements.
    *   Duotone or filled icons for major service categories.

## 2. Component Architecture
We will refactor `ui/src/components` to follow a strict Atomic design.

### Atoms (The Basics)
*   **`Button`**: High-contrast, touch-friendly sizes (44px+ touch targets). Variants: Primary (Emerald), Secondary (Outline), Ghost (Text), Destructive (Red).
*   **`Input`**: Floating labels for clarity. Built-in validation error slots.
*   **`Badge`**: Pill-shaped status indicators (e.g., "Ready", "In Review").
*   **`Card`**: White background, subtle shadow (`shadow-sm` -> `shadow-md` on hover), rounded corners (`rounded-xl`).

### Molecules (Functional Units)
*   **`ServiceTile`**: Large, clickable card for starting flows (e.g., "New Trade License"). Includes icon, title, and description.
*   **`ProcessTimeline`**: Vertical step tracker showing "Completed", "Current", and "Future" steps.
*   **`DocumentCard`**: Thumbnail preview + Status Badge + Action (Replace/Edit). Shows OCR readiness score.
*   **`WizardProgress`**: Top bar showing percentage complete and current step name.

## 3. Page Redesigns

### A. Landing Page (`app/page.tsx`)
*   **Hero Section:** Personal greeting ("Welcome back, [Name]") with a search bar for services.
*   **Dashboard Grid:**
    *   **Left/Top:** "Start a New Service" - Grid of tiles.
    *   **Right/Bottom:** "My Activities" - List of active applications with status bars.
*   **Offline Indicator:** A subtle banner that appears when connectivity is lost.

### B. Wizard Layout (`app/flows/[id]/layout.tsx`)
*   **Focus Mode:** Remove standard navigation.
*   **Sticky Header:** Shows progress and "Save & Exit".
*   **Sticky Footer (Mobile):** Primary action button always reachable.

### C. Analysis/Result View
*   **Split View (Desktop):** Document preview on left, analysis/form on right.
*   **Stacked View (Mobile):** Tabs for "Document" vs "Analysis".

## 4. Implementation Strategy
1.  **Foundation:** Update `tailwind.config.ts` with the new color palette and font family.
2.  **Core Components:** Create/Update `Button`, `Card`, `Input` in `ui/src/components/common`.
3.  **Layouts:** Implement the global `Navbar` and the specialized `WizardLayout`.
4.  **Pages:** Rebuild the Landing Page and the base Wizard flow.

## 5. Next Steps
Upon approval, I will:
1.  Configure Tailwind.
2.  Build the Core Component Library.
3.  Implement the Dashboard.
