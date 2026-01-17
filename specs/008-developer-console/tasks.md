# Tasks: Developer Console (TUI/CLI)

**Status**: Planned

## Phase 1: Foundation
- [x] Initialize `ui/cli-tui` project structure (pyproject.toml, src/). <!-- id: 0 -->
- [x] Implement `typer` CLI entry point with `status` and `tui` commands. <!-- id: 1 -->
- [x] Create basic Textual app skeleton (Header, Footer, Sidebar). <!-- id: 2 -->

## Phase 2: Connectivity
- [x] Implement `Config` loader (env vars for Temporal/Backend URLs). <!-- id: 3 -->
- [x] Create `ApiClient` for interacting with Backend REST API. <!-- id: 4 -->
- [x] Create `TemporalClient` helper (wrapping `temporalio`). <!-- id: 5 -->

## Phase 3: Dashboard
- [x] Implement `DashboardScreen` widget. <!-- id: 6 -->
- [x] Add "System Status" panels (Backend Ping, Temporal Ping). <!-- id: 7 -->

## Phase 4: Workflows
- [x] Implement `WorkflowList` widget (DataTable). <!-- id: 8 -->
- [x] Implement `WorkflowDetail` view (Tree/Log view of history). <!-- id: 9 -->
- [x] Wire up API calls to list/fetch workflows. <!-- id: 10 -->

## Phase 5: Agent Runner
- [x] Implement `AgentRunner` screen. <!-- id: 11 -->
- [x] Add JSON editor widget (TextLog/TextArea). <!-- id: 12 -->
- [x] Implement "Run" action connecting to Backend `/test/agent` endpoint. <!-- id: 13 -->

## Phase 6: Polish
- [x] Apply "GovAssist" theme/styling. <!-- id: 14 -->
- [x] Add comprehensive keyboard shortcuts. <!-- id: 15 -->
- [x] Write `README.md` for developers. <!-- id: 16 -->
