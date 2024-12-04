import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from flask_restful import Api
from resources import (
    UserResource,
    LoginResource,
    ProjectResource,
    ExpenseResource,
    ProjectArchiveResource,
    ExpenseArchiveResource,
)
from collaboration_resources import CollaboratorsResource
from Auth_Resources.account_recovery_resource import AccountRecoveryResource  # Correct path
from Auth_Resources.current_user import CurrentUserResource  # Correct path


def register_routes(app):
    api = Api(app)

    # User-related routes
    api.add_resource(UserResource, '/users', '/users/<int:user_id>')
    api.add_resource(LoginResource, '/login')
    api.add_resource(AccountRecoveryResource, '/account/recovery')  # Password recovery route
    api.add_resource(CurrentUserResource, '/current-user')  # Current user route

    # Project-related routes
    api.add_resource(ProjectResource, '/projects', '/projects/<int:project_id>')
    api.add_resource(
        CollaboratorsResource,
        '/projects/<int:project_id>/collaborators',  # For GET and POST
        '/projects/<int:project_id>/collaborators/<int:user_id>',  # For DELETE
    )
    api.add_resource(
        ProjectArchiveResource,
        '/projects/<int:project_id>/archive',
        endpoint='project_archive'
    )

    # Expense-related routes
    api.add_resource(ExpenseResource, '/expenses', '/expenses/<int:expense_id>')
    api.add_resource(
        ExpenseArchiveResource,
        '/expenses/<int:expense_id>/archive',
        endpoint='expense_archive'
    )
