Setup SQL (run in this order):
1. `sql/DDL.SQL` (creates schema + sample data + `ResetToDDLState` procedure)
2. `sql/PL.SQL` (creates all CRUD stored procedures used by the web app)

Build app:
`npm run build`

Start app:
- Backend: `npm run backend:production`
- Frontend: `npm run production`

Project notes:
- Every table has a corresponding SELECT route/page in the UI.
- All INSERT/UPDATE/DELETE API routes call stored procedures.
- Intersection-table pages use dynamic dropdowns for FK selection (no manual FK ID typing).
- Home page provides reset via `CALL ResetToDDLState()`.

Reach out with questions to millekit@oregonstate.edu
