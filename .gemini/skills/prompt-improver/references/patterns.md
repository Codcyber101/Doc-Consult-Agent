# Prompt Engineering Patterns for Coding

These patterns help structure prompts to get the best results from coding agents.

## 1. Persona Pattern
**Goal:** Set the tone, expertise level, and perspective.
**Template:**
> "Act as a [Role]. You are an expert in [Topic]. Your goal is to [Goal]."
**Example:**
> "Act as a Senior DevOps Engineer. You are an expert in Kubernetes and Terraform. Your goal is to optimize our cluster autoscaling configuration."

## 2. Chain of Thought (CoT)
**Goal:** Encourage logical reasoning and reduce errors in complex tasks.
**Template:**
> "[Task description]. Let's think step by step. First, [Step 1]. Then, [Step 2]. Finally, [Step 3]."
**Example:**
> "Debug this race condition. Let's think step by step. First, identify the shared resource. Then, analyze the access patterns. Finally, propose a locking mechanism."

## 3. Few-Shot Prompting
**Goal:** Clarify expectations by providing examples.
**Template:**
> "[Instruction]
> Example 1 Input: [Input]
> Example 1 Output: [Output]
> Example 2 Input: [Input]
> Example 2 Output: [Output]
> Current Input: [Input]"

## 4. Template Pattern
**Goal:** Enforce a specific structure on the output.
**Template:**
> "Analyze the code and provide the output in the following format:
> ## Summary
> [Brief summary]
> ## Issues
> - [Issue 1]
> - [Issue 2]
> ## Recommendations
> [Code block]"

## 5. Constraint Enforcement
**Goal:** Prevent common pitfalls or adherence to strict rules.
**Template:**
> "Generate code to [Task].
> Constraints:
> 1. No external dependencies.
> 2. Max time complexity O(n).
> 3. Must apply to [File/Path]."

## 6. Refinement Pattern
**Goal:** Improve the code iteratively.
**Template:**
> "Critique the following code for [Criteria, e.g., security, performance]. Provide specific suggestions for improvement, then rewrite the code applying those suggestions."

## 7. Socratic Pattern (The Mentor)
**Goal:** Teach the user by guiding them rather than giving the answer immediately.
**Template:**
> "Act as a Tutor. I will provide a problem. Do not give the solution. Instead, ask me guiding questions to help me solve it myself. Only provide the code when I explicitly ask for it."

## 8. Minimalist Pattern (The Executor)
**Goal:** Maximum efficiency, zero fluff.
**Template:**
> "Act as a code generator. Task: [Task]. Output: Code block only. No conversational text, no explanations, no markdown headers outside the code block."