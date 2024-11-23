from extensions import api  # Import api from extensions
from resources import UserResource, ProjectResource, ExpenseResource, LoginResource

def register_routes(app):
    print("Registering routes...")
    api.init_app(app)  # Initialize api with app
    api.add_resource(UserResource, '/users', '/users/<int:user_id>')
    api.add_resource(LoginResource, '/login')
    api.add_resource(ProjectResource, '/projects', '/projects/<int:project_id>')
    api.add_resource(ExpenseResource, '/expenses', '/expenses/<int:expense_id>')
    print("Routes registered successfully!")
