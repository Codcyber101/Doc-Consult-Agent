#!/usr/bin/env python3
"""
init_vault.py - Initialize Obsidian vault with template folders.
Usage: python init_vault.py /path/to/vault
"""

import sys
import os

FOLDERS = [
    'Templates/Daily',
    'Templates/Weekly',
    'Templates/Meetings',
    'Templates/Projects',
    'Templates/Academic',
    'Templates/Creative',
    'Templates/Technical',
    'Templates/Misc',
]

def main():
    if len(sys.argv) != 2:
        print("Usage: python init_vault.py /path/to/vault")
        sys.exit(1)
    
    vault_path = sys.argv[1]
    for folder in FOLDERS:
        path = os.path.join(vault_path, folder)
        os.makedirs(path, exist_ok=True)
        print(f"Created: {path}")

if __name__ == '__main__':
    main()