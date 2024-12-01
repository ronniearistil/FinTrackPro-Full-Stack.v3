# Getting Started with Create React App

# FinTrackPro

This project is a full-stack financial management and project tracking application. It enables users to manage projects, track expenses, and analyze financial performance in real time.

## Available Scripts

In the **server** directory, you can run:

### `flask run`

Runs the backend server in development mode.  
The server will start on [http://127.0.0.1:5555](http://127.0.0.1:5555).

The server handles the database and API endpoints for users, projects, and expenses. See the [API Documentation](#api-documentation) for more details.

### `python seed.py`

Seeds the database with sample data for testing purposes.  
Ensure your database is properly configured before running this script.

In the **client** directory, you can run:

### `npm start`

Runs the React application in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.  
It bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include hashes.  
Your app is ready to be deployed!

---

## API Documentation

### Users
- `GET /users`: Retrieve all users.
- `POST /users`: Add a new user.
- `PATCH /users/:id`: Update a user's information.
- `DELETE /users/:id`: Delete a user.

### Projects
- `GET /projects`: Retrieve all projects.
- `POST /projects`: Add a new project.
- `PATCH /projects/:id`: Update project details.
- `DELETE /projects/:id`: Delete a project.

### Expenses
- `GET /expenses`: Retrieve all expenses.
- `POST /expenses`: Add a new expense.
- `PATCH /expenses/:id`: Update expense details.
- `DELETE /expenses/:id`: Delete an expense.

### Authentication
- `POST /signup`: Register a new user.
- `POST /login`: Authenticate user and create a session.
- `POST /logout`: Log out the current user.

---

## React Router/Routes

### Main Routes
- `/login`: Renders the login form for user authentication.
- `/signup`: Renders the signup form for user registration.
- `/projects`: Displays the list of all projects.
- `/expenses`: Displays the list of all expenses.
- `/about`: Displays information about FinTrackPro.

### Protected Routes
Routes like `/projects` and `/expenses` are only accessible to logged-in users. Unauthenticated users will be redirected to `/login`.

---

## Database Structure

### Tables
#### Users
- `id`: Primary key.
- `name`: User's name.
- `email`: User's email address.
- `password_hash`: Encrypted password for authentication.

#### Projects
- `id`: Primary key.
- `name`: Project name.
- `budgeted_cost`: Project's budgeted cost.
- `actual_cost`: Project's actual cost.
- `status`: Status of the project (e.g., "In Progress", "Completed").
- `user_id`: Foreign key linking to the user who owns the project.

#### Expenses
- `id`: Primary key.
- `name`: Expense name.
- `amount`: Amount spent on the expense.
- `project_id`: Foreign key linking the expense to its associated project.

---

## Setup Instructions

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/FinTrackPro.git

2. Set up the backend:
    `cd server`
pip install -r requirements.txt
    `flask run`

3. Set up the frontend:
    `cd client`
    `npm install`
    `npm start`

4. Access the app in your browser at [http://localhost:3000]

# Features
## MVP Features
- Secure user authentication and session management.
- Add, edit, delete, and view projects and expenses.
- Dynamic dashboards for visualizing project budgets and expenses.
- Stretch Goals
- Financial forecasting using libraries like NumPy.
- Multi-user collaboration with role-based access.
- Advanced analytics and profitability metrics.

# Deployment
To deploy the app, ensure both the backend and frontend are built and configured for production.
For backend deployment, use a WSGI server like Gunicorn.
For frontend deployment, serve the build folder using a static site hosting service like Netlify or Vercel.