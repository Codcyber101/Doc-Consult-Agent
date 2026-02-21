#!/usr/bin/env python3
"""
This script automates the git commit process.
"""

import subprocess
import sys

def run_command(command):
    """Run a shell command and return the output."""
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {command}", file=sys.stderr)
        print(e.stderr, file=sys.stderr)
        sys.exit(1)

def main():
    """Main function."""
    # Stage all files
    run_command("git add .")

    # Get staged changes
    staged_changes = run_command("git diff --staged")

    if not staged_changes:
        print("No changes to commit.")
        sys.exit(0)

    # Get recent commit messages
    recent_commits = run_command("git log -n 3 --pretty=%s")

    # Generate commit message (placeholder)
    prompt = f"""Generate a conventional commit message for the following changes:

Staged changes:
{staged_changes}

Recent commit messages:
{recent_commits}

Commit message:"""

    # For now, we will just print the prompt and use a placeholder message.
    # In the future, this could be replaced with a call to an LLM.
    print("--- PROMPT FOR LLM ---")
    print(prompt)
    print("------------------------")

    commit_message = "feat: Add new feature"

    # Create commit
    run_command(f'git commit -m "{commit_message}"')

    print("Successfully created commit.")

if __name__ == "__main__":
    main()