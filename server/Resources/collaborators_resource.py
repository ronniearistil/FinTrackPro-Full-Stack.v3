from flask_restful import Resource
from werkzeug import Request
from models import Project, User
from extensions import db


class CollaboratorsResource(Resource):
    def get(self, project_id):
        project = Project.query.get_or_404(project_id)
        return {
            "collaborators": [user.to_dict() for user in project.collaborators]
        }, 200

    def post(self, project_id):
        try:
            data = Request.get_json()
            if not data or "user_id" not in data:
                return {"error": "User ID is required"}, 400

            user_id = data["user_id"]
            project = Project.query.get_or_404(project_id)
            user = User.query.get_or_404(user_id)

            if user in project.collaborators:
                return {
                    "message": f"User {user_id} is already a collaborator on project {project_id}"
                }, 400

            project.collaborators.append(user)
            db.session.commit()

            return {
                "message": f"User {user_id} added as a collaborator to project {project_id}",
                "collaborators": [user.to_dict() for user in project.collaborators]
            }, 201
        except Exception as e:
            db.session.rollback()
            return {"error": f"Failed to add collaborator: {str(e)}"}, 500

    def delete(self, project_id, user_id):
        try:
            project = Project.query.get_or_404(project_id)
            user = User.query.get_or_404(user_id)

            if user not in project.collaborators:
                return {
                    "error": f"User {user_id} is not a collaborator on project {project_id}"
                }, 404

            project.collaborators.remove(user)
            db.session.commit()

            return {
                "message": f"User {user_id} removed from project {project_id}",
                "collaborators": [user.to_dict() for user in project.collaborators]
            }, 200
        except Exception as e:
            db.session.rollback()
            return {"error": f"Failed to remove collaborator: {str(e)}"}, 500
