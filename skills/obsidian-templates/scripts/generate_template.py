#!/usr/bin/env python3
"""
generate_template.py - Generate Obsidian templates based on type.
Usage: python generate_template.py --type daily-note [--output file.md]
"""

import argparse
import os
import shutil

def main():
    parser = argparse.ArgumentParser(description='Generate Obsidian templates')
    parser.add_argument('--type', required=True, help='Template type (e.g., daily-note)')
    parser.add_argument('--advanced', action='store_true', help='Use advanced variant')
    parser.add_argument('--output', help='Output file path')
    args = parser.parse_args()

    templates_dir = os.path.join(os.path.dirname(__file__), '..', 'templates')
    template_file = f"{args.type}.md"
    if args.advanced:
        template_file = f"{args.type}/advanced.md"
    
    source = os.path.join(templates_dir, template_file)
    if not os.path.exists(source):
        print(f"Template not found: {source}")
        return
    
    output = args.output or f"{args.type}.md"
    shutil.copy(source, output)
    print(f"Template generated: {output}")

if __name__ == '__main__':
    main()