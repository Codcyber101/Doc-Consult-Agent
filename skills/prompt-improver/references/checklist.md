# Coding Prompt Quality Checklist

Use this checklist to evaluate and improve prompts for coding agents.

## 1. Context & Goal
- [ ] **Objective:** Is the end goal clearly stated? (e.g., "Fix this bug," "Refactor this function," "Create a new API endpoint").
- [ ] **Role/Persona:** Is the agent's role defined? (e.g., "Act as a Senior Python Engineer," "You are a Security Auditor").
- [ ] **Background:** Is necessary background information provided? (e.g., "This is a Next.js app using the App Router," "We are migrating from v1 to v2").

## 2. Technical Specifics
- [ ] **Tech Stack:** Are all relevant languages, frameworks, and libraries specified? (e.g., "Python 3.11, FastAPI, Pydantic v2").
- [ ] **Constraints:** Are there specific constraints? (e.g., "Do not use external libraries," "Must run on AWS Lambda," "Max latency 200ms").
- [ ] **Existing Code:** Is the relevant code provided or referenced? (Use file paths or paste snippets).

## 3. Output Requirements
- [ ] **Format:** Is the desired output format specified? (e.g., "Return a single Python file," "Provide a diff," "Markdown list").
- [ ] **Scope:** Is the scope of the change clear? (e.g., "Only modify the `auth.py` file," "Create a new folder for this module").
- [ ] **Style:** Are there coding style guidelines? (e.g., "Follow PEP 8," "Use functional programming patterns").

## 4. Examples (Few-Shot)
- [ ] **Input Example:** Is there an example of the input data?
- [ ] **Output Example:** Is there an example of the desired output?
- [ ] **Edge Cases:** Are edge cases mentioned? (e.g., "Handle empty arrays," "What if the API returns 404?").

## 5. Iteration & Refinement
- [ ] **Step-by-Step:** Is the task complex enough to request a Chain of Thought? (e.g., "Think step-by-step before coding").
- [ ] **Error Handling:** Should the code include robust error handling?
- [ ] **Testing:** Should the agent generate tests for the new code?
