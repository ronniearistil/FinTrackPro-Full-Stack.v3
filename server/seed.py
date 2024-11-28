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
        default_user = User.query.filter_by(email="default@fintrackpro.com").first()
        if not default_user:
            default_user = User(
                name="Default User",
                email="default@fintrackpro.com",
                role="admin",
            )
            default_user.set_password("defaultpassword")
            db.session.add(default_user)
            db.session.commit()

        for _ in range(5):
            user = User(
                name=fake.name(),
                email=fake.unique.email(),  # Ensure unique emails
                role="user",
            )
            user.set_password("password123")
            db.session.add(user)
        db.session.commit()

def seed_projects():
    with app.app_context():
        user_ids = [user.id for user in User.query.all()]
        for _ in range(5):
            project_name = fake.catch_phrase()  # Use more descriptive project-related phrases
            start_date = fake.date_this_year(before_today=True, after_today=False)
            end_date = start_date + timedelta(days=fake.random_int(min=30, max=180))  # Longer project timelines
            project = Project(
                name=project_name,
                budgeted_cost=fake.random_number(digits=5, fix_len=True),
                actual_cost=fake.random_number(digits=5, fix_len=True),
                status=fake.random_element(["In Progress", "Completed", "At Risk"]),
                start_date=start_date,
                end_date=end_date,
                user_id=fake.random_element(user_ids),
            )
            db.session.add(project)
        db.session.commit()


def seed_expenses():
    with app.app_context():
        projects = Project.query.all()
        expense_categories = ["Materials", "Labor", "Consultation", "Transportation", "Equipment", "Marketing"]

        for project in projects:
            num_expenses = fake.random_int(min=3, max=10)  # Generate 3-10 expenses per project
            for _ in range(num_expenses):
                expense = Expense(
                    name=fake.random_element(expense_categories),
                    amount=fake.random_number(digits=4, fix_len=True),
                    project_id=project.id,
                )
                db.session.add(expense)
        db.session.commit()

def seed_collaborators():
    with app.app_context():
        projects = Project.query.all()
        users = User.query.all()

        for project in projects:
            # Randomly assign 2 collaborators per project
            collaborators = fake.random_elements(users, length=2, unique=True)
            for collaborator in collaborators:
                if collaborator not in project.collaborators:
                    project.collaborators.append(collaborator)  # Avoid duplicates
            try:
                db.session.commit()
            except Exception as e:
                print(f"Error adding collaborators to project {project.id}: {e}")
                db.session.rollback()  # Roll back the transaction for this project

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        seed_users()
        seed_projects()
        seed_expenses()
        seed_collaborators()
        print("Database seeded successfully!")




