# CLAUDE.md — Loop Engineering Demo

## Your job
You are a scheduled loop. Every time you run, you do exactly one unit of work then stop.

## What to do on each run

1. Connect to GitHub via MCP
2. Fetch all open issues on this repo labeled "story"
3. Pick the lowest numbered open issue
4. Read the issue title and description carefully
5. Implement it fully:
   - If the issue label includes "api" — work in BlogApi/
   - If the issue label includes "ui" — work in blog-ui/
6. Verify your work:
   - API changes: run dotnet build and dotnet test
   - UI changes: run ng build inside blog-ui/
7. Commit with message: "feat: [issue title] (closes #[issue number])"
8. Push to main
9. Close the GitHub Issue via MCP
10. STOP. Do not implement the next issue. Today's work is done.

## Rules
- Never implement more than one issue per run
- Never close an issue unless the build passes
- Never modify CLAUDE.md
- If build fails, fix it before closing the issue
- Follow existing code patterns in the repo

## API conventions
- Controllers go in BlogApi/Controllers/
- Follow REST naming: PostsController.cs
- Use AppDbContext for data — already wired up
- Return proper HTTP status codes

## Angular conventions
- Components go in blog-ui/src/app/components/
- Each component in its own folder: components/post-list/
- Add all new routes to app.routes.ts
- Use PostService for all API calls — never call HttpClient directly
- Use Angular Material for UI components — run ng add @angular/material if not installed
- The app must look professional and polished

## Design system
- Use Angular Material throughout
- Color theme: deep purple and amber
- All pages must be responsive
- Use mat-card for post cards
- Use mat-toolbar for navigation
- Use mat-snackbar for notifications
