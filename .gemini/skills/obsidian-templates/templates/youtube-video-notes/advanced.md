---
created: {{date}}
tags: [youtube, learning, {{channel}}, {{topic}}, advanced]
type: youtube-note
status: draft
video_url: {{video_url}}
channel: {{channel}}
duration: {{duration}}
watched_on: {{date}}
---

# {{title}} - YouTube Notes

## Video Overview
- **URL**: {{video_url}}
- **Channel**: {{channel}}
- **Topic/Category**: [e.g., Programming, History]
- **Key Theme**: Brief summary of main idea
- **My Interest**: Why I watched this (link to goals or projects)

## Key Takeaways
- Bullet-pointed main points, with timestamps if relevant
- Use links to existing notes for integration (e.g., [[Related Concept]])

## Quotes & Highlights
- "Direct quote" - Timestamp
- Connection to my knowledge: [How this relates to what I already know]

## Action Items & Applications
- [ ] Apply this concept in [[Project Name]]
- [ ] Research related topic: [[Topic]]
- [ ] Follow-up video: [Suggested video link]

## Reflections & Connections
- How does this fit into my broader learning path?
- Questions raised: [Open questions for further exploration]
- Links to integrated notes: [[Note1]], [[Note2]]

## Dataview Query for Related Videos
```dataview
TABLE title, channel, created FROM "YouTube Notes" WHERE topic = "{{topic}}" SORT created DESC
```

## Templater Conditional
<% if (tp.frontmatter.channel == "Khan Academy") %> Academic Focus: Integrate with [[Lecture Notes]] <% endif %>

## Next Steps
- Review in {{tomorrow}}
- Share insights with [[Study Group]]

---
Transcribed: {{date}} | Reviewed: [Date]