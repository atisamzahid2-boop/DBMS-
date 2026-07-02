# ⚠️ FIRST: Set Your MySQL Password

Before running the project, you MUST update the MySQL password in one file:

## File to edit: `backend/appsettings.json`

Find this line:
```
"DefaultConnection": "Server=localhost;Database=WholesaleDB;User=root;Password=root;Port=3306;AllowUserVariables=True"
```

Change `Password=root` to your actual MySQL root password.

**Example:** If your MySQL password is `mypassword123`, change it to:
```
"DefaultConnection": "Server=localhost;Database=WholesaleDB;User=root;Password=mypassword123;Port=3306;AllowUserVariables=True"
```

---

## How to run after that:

### Terminal 1 — Backend:
```
cd backend
dotnet restore
dotnet run
```
Wait until you see: `Now listening on http://localhost:5127`

### Terminal 2 — Frontend:
```
cd frontend
npm install
npm run dev
```
Open: http://localhost:5173

### Login:
- Email: `admin@wms.com`
- Password: `Test@123`
(After loading seed data: `mysql -u root -p WholesaleDB < SQL/SeedData.sql`)
