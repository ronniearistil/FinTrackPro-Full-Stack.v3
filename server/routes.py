from flask_restful import Api
from resources import UserResource, LoginResource, ProjectResource, ExpenseResource

def register_routes(app):
    api = Api(app)  # Initialize Api directly here
    api.add_resource(UserResource, '/users', '/users/<int:user_id>')
    api.add_resource(LoginResource, '/login')
    api.add_resource(ProjectResource, '/projects', '/projects/<int:project_id>')
    api.add_resource(ExpenseResource, '/expenses', '/expenses/<int:expense_id>')


