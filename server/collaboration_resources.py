# server/collaboration_resources.py
from flask_restful import Resource
from flask import request
from models import User, Project
from extensions import db
from schemas import UserSchema

user_schema = UserSchema()
class CollaboratorsResource(Resource):
    # GET all collaborators for a project
    def get(self, project_id):
        project = Project.query.get_or_404(project_id)
        collaborators = project.collaborators
        return user_schema.dump(collaborators, many=True), 200

    # POST to add a collaborator
    def post(self, project_id):
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
        return {"message": f"User {user_id} added as collaborator to project {project_id}"}, 200

    # DELETE a collaborator
    def delete(self, project_id, user_id):
        project = Project.query.get_or_404(project_id)
        user = User.query.get_or_404(user_id)

        if user not in project.collaborators:
            return {"error": "User is not a collaborator"}, 404

        project.collaborators.remove(user)
        db.session.commit()
        return {"message": f"User {user_id} removed from project {project_id}"}, 200
