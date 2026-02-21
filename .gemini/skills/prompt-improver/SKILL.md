---
name: prompt-improver
description: This skill helps users craft, refine, and optimize prompts for coding agents. It can generate prompts from scratch based on user intent or improve existing drafts using diverse strategies (Speed, Robustness, Education).
---

# Prompt Improver

## Overview
The **Prompt Improver** (acting as a "Prompt Architect") assists users in communicating effectively with coding agents. It supports two main modes:
1.  **Improvement:** Refining a user's existing draft prompt.
2.  **Generation:** Creating a full, structured prompt from a vague intent.

## Core Workflow

### 1. Assessment & Intent Gathering
Analyze the user's input to decide the mode:
*   **Detailed Input?** -> Go to **Improvement Mode**.
*   **Vague Input** (e.g., "Fix this", "Make a game")? -> Go to **Generation Mode**.

**Generation Mode Protocol:**
*   **Fast Track:** If the user wants quick options or the request is simple, use the `assets/templates/concise_variants.md` template to generate 3 side-by-side concise prompts (Executor, Architect, Mentor).
*   **Deep Dive:** If the input is complex but vague, use the **Intent Gathering Questionnaire** (`assets/templates/intent_gathering.md`) to ask:
    1.  **Goal:** What is the specific outcome?
    2.  **Stack:** What languages/frameworks?
    3.  **Preference:** Do you want Speed (Executor), Quality (Architect), or Learning (Mentor)?

### 2. Strategy Selection (The 3 Variants)
Once context is known, propose or select a strategy from `references/prompt_variants.md`:

*   **Variant A: The Executor (Efficiency)**
    *   *For:* Quick scripts, boilerplates, experienced devs.
    *   *Pattern:* Minimalist Pattern.
*   **Variant B: The Architect (Robustness)**
    *   *For:* Production code, complex features, refactoring.
    *   *Pattern:* Persona + Template + Constraint Enforcement.
*   **Variant C: The Mentor (Education)**
    *   *For:* Learning, debugging, understanding complex logic.
    *   *Pattern:* Socratic Pattern + CoT.

### 3. Drafting & Refinement
Construct the prompt using the selected strategy and relevant templates from `assets/templates/`.
*   **Checklist:** Ensure the generated prompt passes the `references/checklist.md`.

### 4. Presentation
Present the result to the user.
*   If multiple variants were requested (especially via Fast Track), show them side-by-side in code blocks for easy copying.
*   Explain *why* the prompt is structured this way (e.g., "I added a constraint on 'TypeHints' because you selected the Architect variant").

## Usage Guidelines

### Reference Files
*   `references/checklist.md`: The quality standard every prompt must meet.
*   `references/patterns.md`: The library of prompt engineering techniques.
*   `references/prompt_variants.md`: The definitions of the 3 output styles.

### Templates
*   `assets/templates/bug_report.md`: For fixing errors.
*   `assets/templates/feature_request.md`: For building new things.
*   `assets/templates/intent_gathering.md`: For clarifying vague requests.
*   `assets/templates/concise_variants.md`: For generating quick, simplified prompt options.

## Example Interactions

### Scenario 1: Vague Request (Fast Track)
**User:** "I need a regex for email validation in JS."
**Agent:** "Here are 3 prompt options for that:
**Option A (Executor):** 'Act as a code generator. Task: Create a JS regex for email. Output: Code only.'
**Option B (Architect):** 'Act as a Senior JS Engineer. Implement robust email validation. Handle edge cases (unicode), ensure RFC compliance...'
..."

### Scenario 2: Vague Request (Deep Dive)
**User:** "Write a snake game."
**Agent:** "I can help. To generate the best prompt, I need a few details:
1.  **Language:** Python (Pygame) or JavaScript (Web)?
2.  **Style:** Do you want a simple script (Executor) or a full object-oriented design with tests (Architect)?
"
**User:** "Python, Architect style."
**Agent:** *Generates a detailed prompt using the Feature Request Template + Architect constraints.*

### Scenario 3: Draft Improvement
**User:** "Fix this loop." [Pastes code]
**Agent:** "I've improved your prompt to ensure the agent explains the fix:
**Improved Prompt:**
'Act as a Python Mentor. Analyze the attached loop. Explain why it is inefficient, then provide a refactored version using a list comprehension.
**Constraints:** Explain the Big-O time complexity difference.' "