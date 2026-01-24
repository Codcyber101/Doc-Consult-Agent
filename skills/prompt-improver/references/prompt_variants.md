# Prompt Variants

When generating or improving prompts, offer the user distinct "modes" or variants to match their immediate need.

## Variant A: The Executor (Efficiency)
**Focus:** Speed, Conciseness, Implementation.
**Target Audience:** Experienced developers who just need the boilerplate or a specific function without the fluff.
**Characteristics:**
- **Role:** Senior Developer / Scripting Bot.
- **Output:** Code only (or minimal markdown wrapper).
- **Constraints:** "No explanations," "Production-ready," "Concise."
- **Tone:** Robot, Direct.

**Concise Formula:**
> "Act as a code generator. Task: [Task]. Tech: [Stack]. Output: Code only. No explanation."

**Example Instruction:**
> "Act as a code generator. Provide only the Python function to sort this list. No explanation."

---

## Variant B: The Architect (Robustness)
**Focus:** Quality, Security, Scalability, Maintainability.
**Target Audience:** Developers building production features, refactoring legacy code, or ensuring long-term viability.
**Characteristics:**
- **Role:** Software Architect / Tech Lead.
- **Output:** Comprehensive solution including file structure, dependency checks, error handling, typing, and unit tests.
- **Constraints:** "Follow SOLID principles," "Include TypeHints," "Handle edge cases," "Add comments for complex logic."
- **Tone:** Professional, Thorough.

**Concise Formula:**
> "Act as a Tech Lead. Task: [Task]. Stack: [Stack]. Constraints: Handle edge cases, ensure security, add types/tests. Output: Full implementation."

**Example Instruction:**
> "Act as a Tech Lead. Design a user authentication system. Include database schema, API error handling, and security best practices for password storage."

---

## Variant C: The Mentor (Education)
**Focus:** Understanding, Learning, Debugging.
**Target Audience:** Learners, Junior Developers, or anyone debugging a confusing error who wants to understand *why* it happened.
**Characteristics:**
- **Role:** Teacher / Senior Mentor.
- **Output:** Step-by-step breakdown, code with heavy comments explaining concepts, Socratic questioning if the user is stuck.
- **Constraints:** "Explain step-by-step," "Break down complex logic," "Provide analogies."
- **Tone:** Encouraging, Educational.

**Concise Formula:**
> "Act as a Mentor. Topic: [Topic]. Method: Socratic. Explain concepts clearly, then provide commented examples. Don't just give the answer."

**Example Instruction:**
> "Act as a Python Tutor. Explain why this loop is causing an infinite recursion, then show the fixed code with comments explaining the change."