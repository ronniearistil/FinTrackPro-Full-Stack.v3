from flask_restful import Api
from resources import UserResource, ProjectResource, ExpenseResource, LoginResource  

def register_routes(app):
    print("Registering routes...")
    api = Api(app)

    api.add_resource(UserResource, '/users', '/users/<int:user_id>')
    api.add_resource(LoginResource, '/login') 
    api.add_resource(ProjectResource, '/projects', '/projects/<int:project_id>')
    api.add_resource(ExpenseResource, '/expenses', '/expenses/<int:expense_id>')

    print("Routes registered successfully!")




