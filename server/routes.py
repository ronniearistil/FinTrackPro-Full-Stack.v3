from flask_restful import Api
from resources import UserResource, LoginResource, ProjectResource, ExpenseResource
from collaboration_resources import CollaboratorsResource 
# from user_authorization.auth_resources import SignupResource, LogoutResource, CurrentUserResource


def register_routes(app):
    api = Api(app)  # Initialize Api directly here
    api.add_resource(UserResource, '/users', '/users/<int:user_id>')
    api.add_resource(LoginResource, '/login')
    api.add_resource(ProjectResource, '/projects', '/projects/<int:project_id>')
    api.add_resource(ExpenseResource, '/expenses', '/expenses/<int:expense_id>')

# Collaboration routes
    api.add_resource(
    CollaboratorsResource,
    '/projects/<int:project_id>/collaborators',  # For GET and POST
    '/projects/<int:project_id>/collaborators/<int:user_id>'  # For DELETE
)

# # Authorization routes
#     api.add_resource(SignupResource, '/signup')
#     api.add_resource(LoginResource, '/login')
#     api.add_resource(LogoutResource, '/logout')
#     api.add_resource(CurrentUserResource, '/current-user')


