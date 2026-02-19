#!/usr/bin/env python3
"""
export_templates.py - Export templates to Obsidian vault.
Usage: python export_templates.py /path/to/vault
"""

import sys
import shutil
import os

def main():
    if len(sys.argv) != 2:
        print("Usage: python export_templates.py /path/to/vault")
        sys.exit(1)
    
    vault_path = sys.argv[1]
    templates_dir = os.path.join(os.path.dirname(__file__), '..', 'templates')
    target_dir = os.path.join(vault_path, 'Templates')
    
    if not os.path.exists(templates_dir):
        print("Templates directory not found.")
        sys.exit(1)
    
    shutil.copytree(templates_dir, target_dir, dirs_exist_ok=True)
    print(f"Templates exported to {target_dir}")

if __name__ == '__main__':
    main()