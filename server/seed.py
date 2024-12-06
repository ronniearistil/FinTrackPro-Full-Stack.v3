from random import randint
from extensions import db
from app import create_app
from models import User, Project, Expense
from faker import Faker
from datetime import timedelta

fake = Faker()

# Create the Flask app using your create_app function
app = create_app("development")

def seed_users():
    with app.app_context():
        users_created = 0
        default_user = User.query.filter_by(email="default@fintrackpro.com").first()
        if not default_user:
            default_user = User(
                name="Default User",
                email="default@fintrackpro.com",
                role="admin",
            )
            default_user.set_password("defaultpassword")
            db.session.add(default_user)
            users_created += 1

        for _ in range(5):
            user = User(
                name=fake.name(),
                email=fake.unique.email(),  # Ensure unique emails
                role="user",
            )
            user.set_password("password123")
            db.session.add(user)
            users_created += 1
        db.session.commit()

        print(f"Seeded {users_created} users.")

def seed_projects():
    with app.app_context():
        user_ids = [user.id for user in User.query.all()]
        projects_created = 0
        project_ids = []
        for _ in range(5):
            start_date = fake.date_this_year(before_today=True, after_today=False)
            end_date = start_date + timedelta(days=fake.random_int(min=1, max=30))
            project = Project(
                name=fake.company(),
                budgeted_cost=fake.random_number(digits=5),
                actual_cost=0,  # Initialize as 0; will calculate below
                status=fake.random_element(["In Progress", "Completed", "At Risk"]),
                start_date=start_date,
                end_date=end_date,
                user_id=fake.random_element(user_ids),
            )
            db.session.add(project)
            db.session.flush()  # Get project ID immediately after insertion
            project_ids.append(project.id)
            projects_created += 1
        db.session.commit()

        print(f"Seeded {projects_created} projects.")
        return project_ids

def get_category(expense_name):
    categories = {
        "Marketing Campaign": "Marketing",
        "Labor": "Labor",
        "Materials": "Materials",
        "Transportation": "Logistics",
        "Consultation": "Professional Services",
    }
    return categories.get(expense_name, "General")  # Default to "General"

def seed_expenses():
    with app.app_context():
        project_ids = seed_projects()
        total_expenses = 0
        expenses_created = 0
        for project_id in project_ids:
            project_expenses = 0
            for _ in range(randint(3, 10)):  # Create between 3 and 10 expenses per project
                expense_name = fake.word().capitalize()
                category = get_category(expense_name)

                expense = Expense(
                    name=expense_name,
                    amount=fake.random_number(digits=4),
                    project_id=project_id,
                )
                db.session.add(expense)
                project_expenses += expense.amount
                expenses_created += 1

            # Update the project's actual_cost
            project = Project.query.get(project_id)
            if project:
                project.actual_cost = project_expenses
            total_expenses += project_expenses
        db.session.commit()

        print(f"Seeded {expenses_created} expenses across all projects.")
        print(f"Total expenses seeded: ${total_expenses:,.2f}")

def seed_collaborators():
    with app.app_context():
        projects = Project.query.all()
        users = User.query.all()
        collaborators_added = 0

        for project in projects:
            # Randomly assign 2 collaborators per project
            collaborators = fake.random_elements(users, length=2, unique=True)
            for collaborator in collaborators:
                if collaborator not in project.collaborators:
                    project.collaborators.append(collaborator)  # Avoid duplicates
                    collaborators_added += 1
            try:
                db.session.commit()
            except Exception as e:
                print(f"Error adding collaborators to project {project.id}: {e}")
                db.session.rollback()  # Roll back the transaction for this project

        print(f"Added {collaborators_added} collaborators to projects.")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        seed_users()
        seed_projects()
        seed_expenses()
        seed_collaborators()
        print("Database seeded successfully!")
