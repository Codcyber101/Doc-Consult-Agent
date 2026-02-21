---
name: obsidian-templates
description: Tool for generating and managing Obsidian note templates. Provides a curated set of templates for productivity, learning, and creativity, with support for advanced features like Templater and Dataview.
license: MIT
---

# Obsidian Templates Skill

This skill provides a suite of scripts and Markdown templates to streamline your Obsidian workflow. It supports generating standard templates and "advanced" variants that leverage plugins like Templater and Dataview.

## Prerequisites

- **Python 3.x**: Required to run the generation scripts.
- **Obsidian**: The target note-taking application.
- **Recommended Plugins**:
    - **Templater**: For dynamic date insertion and cursor placement.
    - **Dataview**: For querying and aggregating data (required for advanced templates).
    - **Kanban**: For project board views (optional).

## Setup & Usage

### 1. Initialize Vault Structure
Before generating templates, you can set up a standard folder structure in your vault.

```bash
python scripts/init_vault.py "C:/Path/To/Your/Vault"
```
*Creates folders like `Templates/Daily`, `Templates/Meetings`, etc.*

### 2. Generate a Template
Use the `generate_template.py` script to create a new note file from a template.

**Basic Usage:**
```bash
python scripts/generate_template.py --type <type> --output "<path/to/new/note.md>"
```

**Advanced Usage:**
Some templates support an `--advanced` flag (e.g., `daily-note`, `youtube-video-notes`) which includes complex Dataview queries or specific frontmatter.

```bash
python scripts/generate_template.py --type daily-note --advanced --output "Daily/2024-01-01.md"
```

### 3. Validate Templates
Check if a specific template is syntax-valid (basic frontmatter and placeholder check).
```bash
python scripts/validate_template.py "templates/daily-note.md"
```

## Available Templates

### Productivity & Planning

#### Daily Notes
- **Type ID**: `daily-note`
- **Description**: A daily dashboard for tasks, habits, and reflections.
- **Advanced Variant**: Includes Dataview queries for tracking weekly progress and unfinished tasks.

#### Weekly Notes
- **Type ID**: `weekly-note`
- **Description**: Weekly review and planning structure. Includes sections for goals, highlights, and next week's outlook.

#### Meeting Notes
- **Type ID**: `meeting-notes`
- **Description**: Structure for agendas, attendees, and action items.

#### Idea Capture
- **Type ID**: `idea-capture`
- **Description**: Quick format for logging brainstorming sessions or random thoughts.

### Academic & Learning

#### YouTube Video Notes
- **Type ID**: `youtube-video-notes`
- **Description**: Structured note-taking for educational videos.
- **Advanced Variant**: Includes fields for channel metadata, URL, and specific "Key Takeaways" sections formatted for easier review.

#### Lecture Notes
- **Type ID**: `lecture-notes`
- **Description**: Format for class or seminar notes, including key concepts and summary fields.

### Creative & Technical

#### Creative Writing
- **Type ID**: `creative-writing`
- **Description**: Outline for stories, including character lists, plot points, and draft sections.

#### Code Snippets
- **Type ID**: `code-snippets`
- **Description**: Library format for saving reusable code blocks with description and usage examples.

## Roadmap (Planned Templates)

The following templates are planned for future updates. You can currently create them manually by adding `.md` files to the `templates/` directory:
- Project Plans
- Habit Trackers
- Research Papers
- Book Summaries
- Recipe Cards
- Travel Logs
- Bug Reports
- API Documentation

## Customization

You can add your own templates by placing a Markdown file in the `templates/` directory.
- For a simple template: `templates/my-new-type.md`
- For a template with an advanced variant:
    - Create folder `templates/my-new-type/`
    - Add `templates/my-new-type/basic.md` (default)
    - Add `templates/my-new-type/advanced.md` (triggered by `--advanced`)
