from flask_restful import Resource
from flask import request
from models import User, Project
from extensions import db
from schemas import UserSchema

user_schema = UserSchema()

class CollaboratorsResource(Resource):
    def get(self, project_id):
        try:
            project = Project.query.get_or_404(project_id)
            collaborators = project.collaborators
            return {"collaborators": user_schema.dump(collaborators, many=True)}, 200
        except Exception as e:
            return {"error": f"Failed to retrieve collaborators: {str(e)}"}, 500

    def post(self, project_id):
        try:
            data = request.get_json()
            user_id = data.get('user_id')
            if not user_id:
                return {"error": "user_id is required"}, 400

            project = Project.query.get_or_404(project_id)
            user = User.query.get_or_404(user_id)

            if user in project.collaborators:
                return {"message": "User is already a collaborator"}, 200

            project.collaborators.append(user)
            db.session.commit()
            return {
                "message": f"User {user_id} added as collaborator to project {project_id}",
                "collaborators": user_schema.dump(project.collaborators, many=True)
            }, 201
        except Exception as e:
            db.session.rollback()
            return {"error": f"Failed to add collaborator: {str(e)}"}, 500

    def delete(self, project_id, user_id):
        try:
            project = Project.query.get_or_404(project_id)
            user = User.query.get_or_404(user_id)

            if user not in project.collaborators:
                return {"error": "User is not a collaborator"}, 404

            project.collaborators.remove(user)
            db.session.commit()
            return {
                "message": f"User {user_id} removed from project {project_id}",
                "collaborators": user_schema.dump(project.collaborators, many=True)
            }, 200
        except Exception as e:
            db.session.rollback()
            return {"error": f"Failed to remove collaborator: {str(e)}"}, 500
