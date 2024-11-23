import unittest
from app import create_app
from extensions import db
from models import Project, User

class TestProjects(unittest.TestCase):
    def setUp(self):
        self.app = create_app("testing")
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()
            # Add a user for project association
            user = User(name="User1", email="user1@example.com", role="user")
            user.set_password("password123")
            db.session.add(user)
            db.session.commit()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_create_project(self):
        # Test POST /projects
        response = self.client.post('/projects', json={
            "name": "Project1",
            "budgeted_cost": 10000,
            "status": "In Progress",
            "start_date": "2023-11-01",
            "user_id": 1
        })
        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data['name'], "Project1")

    def test_get_all_projects(self):
        # Add a test project
        with self.app.app_context():
            project = Project(
                name="Project2", budgeted_cost=15000, status="Completed", user_id=1
            )
            db.session.add(project)
            db.session.commit()

        # Test GET /projects
        response = self.client.get('/projects')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['name'], "Project2")

if __name__ == "__main__":
    unittest.main()
