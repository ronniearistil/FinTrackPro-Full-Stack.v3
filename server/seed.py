from app import db, create_app  # Removed bcrypt since it's not used in seeding
from models import User, Project, Expense
from faker import Faker
from datetime import datetime, timedelta
from app import db

fake = Faker()

# Create the Flask app using your create_app function
app = create_app("development")  # Use the 'development' configuration

def seed_users():
    # Seed default admin user
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

    # Seed additional users
    for _ in range(5):
        user = User(
            name=fake.name(),
            email=fake.email(),
            role="user",
        )
        user.set_password("password123")
        db.session.add(user)
    db.session.commit()

def seed_projects():
    user_ids = [user.id for user in User.query.all()]  # Fetch user IDs for assigning projects
    for _ in range(5):
        start_date = fake.date_this_year(before_today=True, after_today=False)
        end_date = start_date + timedelta(days=fake.random_int(min=1, max=30))
        project = Project(
            name=fake.company(),
            budgeted_cost=fake.random_number(digits=5),
            actual_cost=fake.random_number(digits=5),
            projected_revenue=fake.random_number(digits=5),
            actual_revenue=fake.random_number(digits=5),
            status=fake.random_element(["In Progress", "Completed", "At Risk"]),
            start_date=start_date,
            end_date=end_date,
            user_id=fake.random_element(user_ids),  # Assign projects to random users
        )
        db.session.add(project)
    db.session.commit()

def seed_expenses():
    project_ids = [project.id for project in Project.query.all()]  # Fetch project IDs for assigning expenses
    for _ in range(15):
        expense = Expense(
            name=fake.word(),
            amount=fake.random_number(digits=4),
            project_id=fake.random_element(project_ids),  # Assign expenses to random projects
        )
        db.session.add(expense)
    db.session.commit()

if __name__ == "__main__":
    with app.app_context():  # Ensure app context is active
        db.create_all()  # Create all tables before seeding data
        seed_users()      # Seed users first
        seed_projects()   # Seed projects after users
        seed_expenses()   # Seed expenses after projects
        print("Database seeded successfully!")



