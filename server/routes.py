import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from flask_restful import Api
from resources import UserResource, LoginResource, ProjectResource, ExpenseResource
from collaboration_resources import CollaboratorsResource 

# from server.Auth_Resources.current_user import CurrentUserResource
# from server.User.Auth_Resources.signup import SignupResource
# from server.User.Auth_Resources.signin import LoginResource
# from server.User.Auth_Resources.current_user import CurrentUserResource
# from User.Auth_Resources.check_login_status import CheckLoginStatusResource

def register_routes(app):
    api = Api(app)  # Initialize Api directly here
    api.add_resource(UserResource, '/users', '/users/<int:user_id>')
    api.add_resource(LoginResource, '/login')
    api.add_resource(ProjectResource, '/projects', '/projects/<int:project_id>')
    api.add_resource(ExpenseResource, '/expenses', '/expenses/<int:expense_id>')
    # api.add_resource(CurrentUserResource, '/current-user')

# Collaboration routes
    api.add_resource(
    CollaboratorsResource,
    '/projects/<int:project_id>/collaborators',  # For GET and POST
    '/projects/<int:project_id>/collaborators/<int:user_id>'  # For DELETE
)

# # Authentication routes
#     api.add_resource(SignupResource, '/signup')  # For user signup
#     api.add_resource(LoginResource, '/login')  # For user login
#     api.add_resource(CurrentUserResource, '/current-user')  # For fetching current user
#     api.add_resource(CheckLoginStatusResource, "/auth/status")
