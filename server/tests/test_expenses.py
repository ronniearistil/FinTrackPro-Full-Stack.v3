import unittest
from app import create_app
from extensions import db
from models import Expense, Project, User


class TestExpenses(unittest.TestCase):
    def setUp(self):
        # Set up a test app instance
        self.app = create_app("testing")  # Ensure a testing configuration exists
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

            # Add a user for project association
            user = User(name="Test User", email="testuser@example.com", role="user")
            user.set_password("password123")
            db.session.add(user)

            # Add a project for expense association
            project = Project(
                name="Test Project",
                budgeted_cost=5000,
                status="In Progress",
                start_date="2023-11-01",
                user_id=1
            )
            db.session.add(project)
            db.session.commit()

    def tearDown(self):
        # Clean up database after each test
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_create_expense(self):
        # Test POST /expenses
        response = self.client.post('/expenses', json={
            "name": "Test Expense",
            "amount": 200,
            "project_id": 1
        })
        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data['name'], "Test Expense")
        self.assertEqual(data['amount'], 200)

    def test_get_all_expenses(self):
        # Add a test expense
        with self.app.app_context():
            expense = Expense(name="Test Expense 1", amount=300, project_id=1)
            db.session.add(expense)
            db.session.commit()

        # Test GET /expenses
        response = self.client.get('/expenses')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['name'], "Test Expense 1")
        self.assertEqual(data[0]['amount'], 300)

    def test_get_expense_by_id(self):
        # Add a test expense
        with self.app.app_context():
            expense = Expense(name="Test Expense 2", amount=400, project_id=1)
            db.session.add(expense)
            db.session.commit()

        # Test GET /expenses/<expense_id>
        response = self.client.get('/expenses/1')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data['name'], "Test Expense 2")
        self.assertEqual(data['amount'], 400)

    def test_update_expense(self):
        # Add a test expense
        with self.app.app_context():
            expense = Expense(name="Test Expense 3", amount=500, project_id=1)
            db.session.add(expense)
            db.session.commit()

        # Test PATCH /expenses/<expense_id>
        response = self.client.patch('/expenses/1', json={"amount": 600})
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data['amount'], 600)

    def test_delete_expense(self):
        # Add a test expense
        with self.app.app_context():
            expense = Expense(name="Test Expense 4", amount=700, project_id=1)
            db.session.add(expense)
            db.session.commit()

        # Test DELETE /expenses/<expense_id>
        response = self.client.delete('/expenses/1')
        self.assertEqual(response.status_code, 204)

        # Ensure the expense is deleted
        with self.app.app_context():
            deleted_expense = Expense.query.get(1)
            self.assertIsNone(deleted_expense)


if __name__ == "__main__":
    unittest.main()
