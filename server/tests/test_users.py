import unittest
from app import create_app
from extensions import db
from models import User

class TestUsers(unittest.TestCase):
    def setUp(self):
        # Set up a test app instance
        self.app = create_app("testing")  # Ensure "testing" config is set up
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        # Clean up database after each test
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_get_all_users(self):
        # Create test users
        with self.app.app_context():
            user1 = User(name="Alice", email="alice@example.com", role="user")
            user1.set_password("password123")
            db.session.add(user1)
            db.session.commit()

        # Test GET /users
        response = self.client.get('/users')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['name'], "Alice")

    def test_create_user(self):
        # Test POST /users
        response = self.client.post('/users', json={
            "name": "Bob",
            "email": "bob@example.com",
            "password": "password123",
            "role": "user"
        })
        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data['name'], "Bob")
        self.assertEqual(data['email'], "bob@example.com")

    def test_update_user(self):
        # Create a user
        with self.app.app_context():
            user = User(name="Charlie", email="charlie@example.com", role="user")
            user.set_password("password123")
            db.session.add(user)
            db.session.commit()

        # Test PATCH /users/<user_id>
        response = self.client.patch('/users/1', json={"name": "Charlie Updated"})
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data['name'], "Charlie Updated")

    def test_delete_user(self):
        # Create a user
        with self.app.app_context():
            user = User(name="David", email="david@example.com", role="user")
            user.set_password("password123")
            db.session.add(user)
            db.session.commit()

        # Test DELETE /users/<user_id>
        response = self.client.delete('/users/1')
        self.assertEqual(response.status_code, 204)

if __name__ == "__main__":
    unittest.main()
