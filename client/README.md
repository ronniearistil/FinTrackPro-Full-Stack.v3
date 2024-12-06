# FinTrackPro
**Phase 4 Project – Flatiron School – Cohort 09/16/2024**

---

## Overview
FinTrackPro is a full-stack application designed to help businesses and individuals forecast expenses, manage project budgets, and analyze profitability in real time. Built with a dynamic React frontend and a robust Flask backend, it streamlines financial management and project tracking to empower users to make data-driven decisions.

---

## Features
### Core Functionality
- **CRUD Actions**: Create, read, update, and delete operations for both projects and expenses.
- **Archiving**: Archive/unarchive projects and expenses for improved data organization.
- **User Authentication**: Secure signup, login, logout, and session management using JWT.
- **Data Validations**: 
  - Projects and expenses validated for specific formats and rules.
  - Prevent invalid data submissions with both client- and server-side validation.
- **Real-Time Tracking**: Monitor budgeted and actual costs for projects.

### User Stories
- Add, update, and delete projects and associated expenses.
- View all projects and expenses with dynamic dashboards.
- Archive completed projects or outdated expenses for better focus.
- Collaborate on projects with role-based access for multiple users.

### Stretch Goals
- Forecast financial metrics using advanced analytics.
- Visualize financial data with dynamic charts and profitability metrics.

---

## Technologies Used

### Frontend
- **React**: Dynamic rendering and state management.
- **React Router**: Client-side routing for navigation.
- **Formik & Yup**: Forms and input validation.
- **Toast Notifications**: User-friendly feedback for success and error states.

### Backend
- **Flask**: RESTful API framework for building the backend.
- **Flask-SQLAlchemy**: ORM for database management.
- **Flask-Migrate**: Handles database schema migrations using Alembic.
- **Flask-JWT-Extended**: Provides secure user authentication with JWT.
- **Flask-CORS**: Enables cross-origin communication between frontend and backend.
- **Flask-Mail**: Configures and sends email notifications.
- **Flask-RESTful**: Simplifies API route definitions and management.

### Database
- **SQLite**: Lightweight, file-based relational database.

### Libraries and Tools
- **Marshmallow**: Object serialization and deserialization.
- **Marshmallow-SQLAlchemy**: Integration of Marshmallow with SQLAlchemy models.
- **bcrypt**: Secure hashing for storing passwords.
- **Python-Dotenv**: Load environment variables from `.env` files.
- **Faker**: Generate mock data for testing and database seeding.
- **PyJWT**: JSON Web Token library for additional JWT functionality.

### Development Tools
- **ipython**: Enhanced interactive Python shell.
- **ipdb**: Interactive debugger for Python.
- **Werkzeug**: Comprehensive WSGI web application library.
- **Alembic**: Database migrations management.
- **Jinja2**: Templating engine used by Flask.

---

## Models and Relationships

### User
- **Attributes**: id, name, email, password_hash, role, is_active, created_at, updated_at
- **Relationships**: 
  - Many-to-Many with projects through the `user_projects` association table.
  - Can collaborate on multiple projects.

### Project
- **Attributes**: id, name, budgeted_cost, actual_cost, status, progress_percentage, category, start_date, end_date, user_id
- **Relationships**:
  - Belongs to a user.
  - Many-to-Many with collaborators (users).
  - One-to-Many with expenses.

### Expense
- **Attributes**: id, name, amount, project_id
- **Relationships**:
  - Belongs to a project.

---

## Application Pages

### Home Page
- **Path**: `/`
- **Description**: Welcome page introducing the app.

### Dashboard
- **Path**: `/projects`
- **Description**: Displays all user projects with budgeted vs. actual costs.

### Expense Dashboard
- **Path**: `/expenses`
- **Description**: Lists all expenses, grouped by project.

### Authentication Pages
- **Sign Up**: `/signup`
- **Login**: `/login`

### Project Pages
- **Add Project**: `/projects/new`
- **Edit Project**: `/projects/:id/edit`

### Expense Pages
- **Add Expense**: `/expenses/new`
- **Edit Expense**: `/expenses/:id/edit`

---

## Setup Instructions

### Backend Setup
1. Navigate to the `server` directory.
2. Install dependencies:
   ```bash
   pipenv install
   pipenv shell
3. Run the Flask server:
   `flask run`
4. Initialize the database:
`flask db init`
`flask db migrate -m "Initial migration"`
`flask db upgrade`
5. (Optional) Seed the database with mock data
  `python seed.py`

### Frontend Setup
1. Navigate to the client directory.
2. Install dependencies:
`npm install`
3. Start the React application:
   `npm start`

## API Documentation
 - **Users**
      GET /users: Retrieve all users.
      POST /users: Add a new user.
      PATCH /users/<id>: Update a user's information.
      DELETE /users/<id>: Delete a user.
- **Projects**
      GET /projects: Retrieve all projects.
      POST /projects: Add a new project.
      PATCH /projects/<id>: Update project details.
      DELETE /projects/<id>: Delete a project.
- **Expenses**
     GET /expenses: Retrieve all expenses.
     POST /expenses: Add a new expense.
     PATCH /expenses/<id>: Update expense details.
     DELETE /expenses/<id>: Delete an expense.
  
  # Future Enhancements
- Analytics: Add advanced financial forecasting and profitability metrics.
- Collaboration: Introduce real-time collaboration features with role-based access.
- Charts: Implement dynamic charts for visualizing financial data.

# Acknowledgements
- Special thanks to Flatiron School instructors and peers for their guidance and support throughout this project.









