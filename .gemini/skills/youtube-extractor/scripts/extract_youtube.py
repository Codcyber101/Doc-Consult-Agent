#!/usr/bin/env python3
"""
YouTube Video Extractor Script (AI Enhanced)

Extracts metadata and transcript from a YouTube video URL, uses Google Gemini to analyze the content,
and generates a comprehensive Obsidian note.

Usage: python extract_youtube.py <YOUTUBE_URL>
"""

import sys
import json
import datetime
import os
import re
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi
from yt_dlp import YoutubeDL
from dotenv import load_dotenv

# Load .env file
# Try to find .env in the parent directory of this script
env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=env_path)

# Configure Gemini
API_KEY = os.getenv('GOOGLE_API_KEY')
if not API_KEY:
    # Try the other variable name just in case
    API_KEY = os.getenv('GEMINI_API_KEY')

if API_KEY:
    genai.configure(api_key=API_KEY)
else:
    print("Warning: GOOGLE_API_KEY or GEMINI_API_KEY not found. AI analysis will be skipped.")

def sanitize_filename(filename):
    return re.sub(r'[\\/*?:\"<>|]', "", filename)

def extract_youtube_data(url):
    try:
        # Extract video ID from URL
        video_id_match = re.search(r'(?:v=|\/)([0-9A-Za-z_-]{11})', url)
        if not video_id_match:
            raise Exception("Invalid YouTube URL format")
        video_id = video_id_match.group(1)

        # Get metadata using yt-dlp
        ydl_opts = {'quiet': True, 'no_warnings': True}
        with YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            title = info.get('title', 'Unknown Title')
            channel = info.get('uploader', 'Unknown Channel')
            duration = info.get('duration', 0)
            duration_str = str(datetime.timedelta(seconds=duration)) if duration else "Unknown"
            thumbnail = info.get('thumbnail', '')
            description = info.get('description', '')

        # Extract transcript
        try:
            api = YouTubeTranscriptApi()
            transcript_list = api.list(video_id)
            transcript = transcript_list.find_transcript(['en']) 
            transcript_data = transcript.fetch()
            transcript_text = ' '.join([item.text for item in transcript_data])
        except Exception:
            transcript_text = "" # Empty string if failed, handled later

        return {
            'title': title,
            'channel': channel,
            'duration': duration_str,
            'thumbnail': thumbnail,
            'description': description,
            'transcript': transcript_text,
            'url': url
        }

    except Exception as e:
        return {'error': str(e)}

def analyze_with_ai(transcript):
    if not API_KEY or not transcript:
        return {}

    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""
    You are an expert note-taker and learning assistant. I will provide you with a video transcript.
    Your task is to analyze it and generate specific sections for an Obsidian note.
    
    Return ONLY a raw JSON object (no markdown formatting, no code blocks) with the following keys:
    - \"summary\": A comprehensive paragraph summarizing the video's core message.
    - \"key_terms\": A list of bullet points defining key terminology or concepts mentioned.
    - \"takeaways\": A list of bullet points with key takeaways.
    - \"examples\": A list of bullet points describing practical examples or use cases.
    - \"quotes\": A list of memorable quotes.
    - \"actions\": A checklist of actionable items or applications.
    - \"reflections\": A few sentences on broader connections, questions raised, or learning path integration.
    - \"topic\": A 1-2 word category for this video (e.g., \"Productivity\", \"Coding\", \"History\").

    Transcript:
    {transcript[:30000]}  # Truncate to avoid context limits if very long
    """

    try:
        response = model.generate_content(prompt)
        text = response.text
        # Clean up if the model wraps in markdown code blocks
        text = text.replace('```json', '').replace('```', '').strip()
        return json.loads(text)
    except Exception as e:
        print(f"AI Analysis Failed: {e}")
        return {}

def fill_template(data, ai_data):
    # Determine template path
    template_path = os.path.abspath(os.path.join(
        os.path.dirname(__file__), '..', '..', 'obsidian-templates', 'templates', 'youtube-video-notes.md'
    ))
    
    if not os.path.exists(template_path):
         template_path = os.path.join('obsidian-templates', 'templates', 'youtube-video-notes.md')

    if not os.path.exists(template_path):
         return f"Error: Template not found at {template_path}"

    with open(template_path, 'r', encoding='utf-8') as f:
        template = f.read()

    # Current date
    today = datetime.date.today().isoformat()
    tomorrow = (datetime.date.today() + datetime.timedelta(days=1)).isoformat()

    # Helper to format list as markdown bullets
    def format_list(items):
        if isinstance(items, list):
            return '\n'.join([f"- {item}" for item in items])
        return str(items)

    # Replacements
    topic = ai_data.get('topic', 'General')
    
    replacements = {
        '{{date}}': today,
        '{{video_url}}': data.get('url', ''),
        '{{channel}}': data.get('channel', ''),
        '{{title}}': data.get('title', ''),
        '{{duration}}': data.get('duration', ''),
        '{{topic}}': topic,
        '{{tomorrow}}': tomorrow,
        '{{transcription}}': data.get('transcript', ''),
        '{{thumbnail}}': data.get('thumbnail', ''),
        
        # AI Content
        '{{summary}}': ai_data.get('summary', '*Summary not generated*'),
        '{{key_terms}}': format_list(ai_data.get('key_terms', [])),
        '{{takeaways}}': format_list(ai_data.get('takeaways', [])),
        '{{examples}}': format_list(ai_data.get('examples', [])),
        '{{quotes}}': format_list(ai_data.get('quotes', [])),
        '{{actions}}': format_list(ai_data.get('actions', [])).replace('- ', '- [ ] '),
        '{{reflections}}': format_list(ai_data.get('reflections', []))
    }

    for placeholder, value in replacements.items():
        template = template.replace(placeholder, str(value))

    # Output filename
    title = data.get('title', 'Untitled')
    safe_title = sanitize_filename(title)
    
    output_dir = 'youtube-video-notes'
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    output_path = os.path.join(output_dir, f"{safe_title}.md")

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(template)
        
    return output_path

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python extract_youtube.py <YOUTUBE_URL>")
        sys.exit(1)

    url = sys.argv[1]
    print(f"Extracting data from {url}...")
    data = extract_youtube_data(url)
    
    if 'error' in data:
        print(f"Error extracting data: {data['error']}")
        sys.exit(1)

    print("Analyzing transcript with AI...")
    ai_data = analyze_with_ai(data.get('transcript', ''))
    
    print("Generating note...")
    note_path = fill_template(data, ai_data)
    print(f"Note successfully created: {note_path}")