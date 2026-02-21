# Integration Examples

## Templater Conditionals
<% if (tp.file.title.includes("Meeting")) %> This is a meeting note. <% endif %>

## Dataview Queries
```dataview
TABLE date, status FROM "Daily Notes" SORT date DESC
```

## Kanban Boards
```kanban
## To Do
- Task 1

## Done
- Completed task
```

## Calendar Automation
Use with Calendar plugin for date-based notes.

## Examples in Templates
See advanced variants in templates/ for full examples.