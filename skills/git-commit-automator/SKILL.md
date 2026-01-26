---
name: git-commit-automator
description: This skill automates the process of creating Git commits. It stages all files, generates a conventional commit message based on the changes, and creates the commit. This skill should be used when the user wants to commit changes to a Git repository.
---

# Git Commit Automator

## Overview

This skill streamlines the Git workflow by automating the commit process. It helps create consistent and meaningful commit messages.

## Workflow

To use this skill, follow these steps:

1.  **Run the `create_commit.py` script.** This script will:
    *   Stage all new and modified files in the current directory.
    *   Generate a commit message based on the staged changes. The message will follow the Conventional Commits specification.
    *   Create a new commit with the generated message.

## Resources

This skill includes the following resources:

### scripts/

*   `create_commit.py`: A Python script that automates the commit process.

### references/

*   `conventional_commits.md`: A reference guide to the Conventional Commits specification.
