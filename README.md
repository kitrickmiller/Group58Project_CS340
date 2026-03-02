Build App: 
npm run build

Start app (dev):
npm run backend:production
npm run production

Reset demo setup:
1. Run the SQL in sql/DDL.SQL so stored procedures are created:
	- DemoDeleteArin()
	- ResetToDDLState()
2. Open Home page in the app.
3. Click "Delete Arin (Demo CUD)" and verify Arin is removed on Characters page.
4. Click "Reset Database to DDL State" and verify sample data is restored.

Procedure API routes:
- POST /api/demo/delete-arin
- POST /api/demo/reset-db
- GET /api/demo/delete-arin
- GET /api/demo/reset-db

Reach out with questions to millekit@oregonstate.edu
