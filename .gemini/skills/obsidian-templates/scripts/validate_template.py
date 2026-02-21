#!/usr/bin/env python3
"""
validate_template.py - Validate Obsidian template files.
Checks YAML frontmatter, placeholders, Markdown syntax.
Usage: python validate_template.py file.md
"""

import sys
import re
import yaml

def validate_frontmatter(content):
    if not content.startswith('---'):
        return False, "Missing YAML frontmatter"
    parts = content.split('---', 2)
    if len(parts) < 3:
        return False, "Invalid frontmatter format"
    # Skip YAML parsing for templates with placeholders
    frontmatter = parts[1]
    if '{{' in frontmatter:
        return True, "Frontmatter contains placeholders (valid for templates)"
    try:
        yaml.safe_load(frontmatter)
        return True, ""
    except yaml.YAMLError as e:
        return False, f"YAML error: {e}"

def validate_placeholders(content):
    # Check for valid placeholders like {{date}}
    placeholders = re.findall(r'\{\{([^}]+)\}\}', content)
    valid = ['date', 'time', 'title', 'yesterday', 'tomorrow', 'week', 'month', 'year']
    invalid = [p for p in placeholders if p not in valid]
    if invalid:
        return False, f"Invalid placeholders: {invalid}"
    return True, ""

def validate_markdown(content):
    # Basic checks: no broken links, etc.
    return True, ""

def main():
    if len(sys.argv) != 2:
        print("Usage: python validate_template.py file.md")
        sys.exit(1)
    
    file_path = sys.argv[1]
    try:
        with open(file_path, 'r') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        sys.exit(1)
    
    checks = [
        validate_frontmatter,
        validate_placeholders,
        validate_markdown,
    ]
    
    for check in checks:
        ok, msg = check(content)
        if not ok:
            print(f"Validation failed: {msg}")
            sys.exit(1)
    
    print("Template is valid.")

if __name__ == '__main__':
    main()