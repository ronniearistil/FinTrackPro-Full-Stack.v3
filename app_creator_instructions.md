# FinTrackPro Server & Client Instructions

## Backend Server Setup

## Generate a Secret Key (Optional for Security)
1. Run the Python interpreter in your CLI:
   python3
2. Then execute the following commands:
  import secrets
  print(secrets.token_hex(24))
3. Use the generated key for secure Flask configurations.
  Initialize the Database
First-Time Setup:
Navigate to the server directory:
  cd server
Set up Flask app:
  export FLASK_APP=app.py
Initialize the migration environment:
  flask db init
  Generate migration scripts:
  flask db migrate -m "Initial migration"
Apply migrations:
  flask db upgrade
  Run the Backend Server
Start the Flask app:
  python app.py
  Seed the database:
  python seed.py
  Flask Database Migration Quick Notes
Initialize migration environment:
  flask db init
Generate a migration script:
  flask db migrate -m "Your migration description"
Apply migrations to the database:
  flask db upgrade

Backend API Endpoints
  User Routes
  GET /users - Fetch all users with their project count.
  POST /users - Add a new user.
Body Example:
{
    "name": "John Doe",
    "email": "john@example.com"
  }
  Project Routes
  GET /projects - Fetch all projects with details.
  POST /projects - Add a new project.
Body Example:
{
  "name": "New Project",
  "budgeted_cost": 10000,
  "status": "In Progress",
  "start_date": "2024-01-01",
  "user_id": 1
}
Expense Routes
GET /expenses - Fetch all expenses.
POST /expenses - Add a new expense.
Body Example:
  {
    "name": "Purchase Supplies",
    "amount": 500,
    "project_id": 1
  }
  Interacting with the Backend via Flask Shell
Start Flask shell:
  flask shell
Inspect Data:

Fetch all users:
  from models import User
  users = User.query.all()
for user in users:
    print(f"ID: {user.id}, Name: {user.name}, Email: {user.email}")
Fetch all projects:
  from models import Project
  projects = Project.query.all()
for project in projects:
    print(f"ID: {project.id}, Name: {project.name}, Budgeted Cost: {project.budgeted_cost}")
Fetch all expenses:
  from models import Expense
  expenses = Expense.query.all()
for expense in expenses:
    print(f"ID: {expense.id}, Name: {expense.name}, Amount: {expense.amount}")
Frontend Server Setup
Navigate to the client directory:
  cd client
Start the React development server:
  npm start
  Server Notes
Default Backend Port: 5555
Default Frontend Port: 3000
Ensure the backend is running before starting the frontend to connect properly.

# Package Check Commend
npm list --depth=0

# To confirm routes are running:
- flask routes
