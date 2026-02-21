---
created: {{date}}
tags: [daily, journal, advanced]
type: daily-note
status: draft
---

# {{title}} - {{date}}

## Overview
Brief summary of the day.

## Tasks
- [ ] Task 1
- [ ] Task 2

## Notes
Free-form space for thoughts.

## Reflections
What went well? What to improve?

## Dataview Query
```dataview
TABLE date, status FROM "Daily Notes" WHERE date >= date({{yesterday}}) SORT date DESC
```

---
Related: [[{{yesterday}}]] | [[{{tomorrow}}]]