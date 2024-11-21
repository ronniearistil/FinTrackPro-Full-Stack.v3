from app import db, bcrypt, create_app
from models import User, Project, Expense
from faker import Faker
from datetime import datetime, timedelta

fake = Faker()
app = create_app()

def seed_users():
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
            email=fake.email(),
            role="user",
        )
        user.set_password("password123")
        db.session.add(user)
    db.session.commit()

def seed_projects():
    user_ids = [user.id for user in User.query.all()]
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
            user_id=fake.random_element(user_ids),
        )
        db.session.add(project)
    db.session.commit()

def seed_expenses():
    project_ids = [project.id for project in Project.query.all()]
    for _ in range(15):
        expense = Expense(
            name=fake.word(),
            amount=fake.random_number(digits=4),
            project_id=fake.random_element(project_ids),
        )
        db.session.add(expense)
    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        seed_users()
        seed_projects()
        seed_expenses()
        print("Database seeded successfully!")


