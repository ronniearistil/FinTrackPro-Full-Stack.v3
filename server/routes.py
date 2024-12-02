import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from flask_restful import Api
from resources import UserResource, LoginResource, ProjectResource, ExpenseResource, ProjectArchiveResource, ExpenseArchiveResource
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

# Define the archive/unarchive route
    api.add_resource(
    ProjectArchiveResource,
    '/projects/<int:project_id>/archive',
    endpoint='project_archive'
)

    api.add_resource(
    ExpenseArchiveResource,
    '/expenses/<int:expense_id>/archive',
    endpoint='expense_archive'
)



# # Authentication routes
#     api.add_resource(SignupResource, '/signup')  # For user signup
#     api.add_resource(LoginResource, '/login')  # For user login
#     api.add_resource(CurrentUserResource, '/current-user')  # For fetching current user
#     api.add_resource(CheckLoginStatusResource, "/auth/status")

# import sys
# import os
# from flask_restful import Api
# 
# # Ensure the script path is in the module search path
# sys.path.append(os.path.abspath(os.path.dirname(__file__)))
# 
# # Import resources from Auth_Resources
# from Auth_Resources.account_recovery_resource import AccountRecoveryResource
# from Auth_Resources.check_login_status import CheckLoginStatusResource
# from Auth_Resources.current_user import CurrentUserResource
# from Auth_Resources.logout import LogoutResource
# from Auth_Resources.signin import LoginResource
# from Auth_Resources.signup import SignupResource
# 
# # Import resources from Resources
# from Resources.user_resource import UserResource
# from Resources.project_resource import ProjectResource
# from Resources.project_resources import ProjectArchiveResource
# from Resources.expense_resource import ExpenseResource
# from Resources.collaborators_resource import CollaboratorsResource
# 
# def register_routes(app):
#     api = Api(app)
# 
#     # User and authentication routes
#     api.add_resource(UserResource, '/users', '/users/<int:user_id>')
#     api.add_resource(SignupResource, '/signup')
#     api.add_resource(LoginResource, '/login')
#     api.add_resource(CurrentUserResource, '/current-user')
#     api.add_resource(CheckLoginStatusResource, '/auth/status')
#     api.add_resource(LogoutResource, '/logout')
# 
#     # Account recovery and reset routes
#     api.add_resource(AccountRecoveryResource, '/accounts/recovery')
# 
#     # Project and expense routes
#     api.add_resource(ProjectResource, '/projects', '/projects/<int:project_id>')
#     api.add_resource(ProjectArchiveResource, '/projects/<int:project_id>/archive', endpoint='project_archive')
#     api.add_resource(ExpenseResource, '/expenses', '/expenses/<int:expense_id>')
# 
#     # Collaboration routes
#     api.add_resource(
#         CollaboratorsResource,
#         '/projects/<int:project_id>/collaborators',
#         '/projects/<int:project_id>/collaborators/<int:user_id>'
#     )
