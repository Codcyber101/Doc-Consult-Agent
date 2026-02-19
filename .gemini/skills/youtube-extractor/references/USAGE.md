# YouTube Extractor Usage Guide

## Installation

1. Install yt-dlp: `pip install yt-dlp`
2. Ensure Python 3.8+ is available.

## Running the Skill

1. Provide a YouTube URL to the script.
2. The script will extract data and generate the Obsidian note.

Example:
```
python scripts/extract_youtube.py https://youtu.be/OPH4yNvuMr8
```

Output: The complete Obsidian note with filled placeholders.

## Limitations

- Transcript extraction is basic; only checks availability.
- Topic inference is simplistic.
- Requires internet access for yt-dlp.