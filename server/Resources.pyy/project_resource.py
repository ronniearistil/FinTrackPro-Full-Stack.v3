# from flask_restful import Resource
# from flask import request
# from marshmallow import ValidationError
# from models import Project, User
# from schemas import ProjectSchema
# from extensions import db
# 
# class ProjectResource(Resource):
#     def get(self, project_id=None):
#         project_schema = ProjectSchema()
#         if project_id:
#             project = Project.query.get_or_404(project_id)
#             return project_schema.dump(project), 200
#         projects = Project.query.all()
#         return project_schema.dump(projects, many=True), 200
# 
#     def post(self):
#         project_schema = ProjectSchema()
#         try:
#             data = request.get_json()
#             if not data:
#                 return {"error": "No data provided or invalid JSON format"}, 400
# 
#             project_data = project_schema.load(data)
#             user = User.query.get(project_data["user_id"])
#             if not user:
#                 return {"error": f"User with ID {project_data['user_id']} does not exist."}, 404
# 
#             project = Project(**project_data)
#             db.session.add(project)
#             db.session.commit()
#             return project_schema.dump(project), 201
# 
#         except ValidationError as err:
#             return {"error": "Validation error", "details": err.messages}, 400
#         except Exception as e:
#             db.session.rollback()
#             return {"error": "Failed to create project", "details": str(e)}, 500
# 
#     def patch(self, project_id):
#         project_schema = ProjectSchema()
#         project = Project.query.get_or_404(project_id)
#         try:
#             data = request.get_json()
#             if not data:
#                 return {"error": "No data provided or invalid JSON format"}, 400
# 
#             project_data = project_schema.load(data, partial=True)
#             for key, value in project_data.items():
#                 setattr(project, key, value)
#             db.session.commit()
#             return project_schema.dump(project), 200
# 
#         except ValidationError as err:
#             return {"error": "Validation error", "details": err.messages}, 400
#         except Exception as e:
#             db.session.rollback()
#             return {"error": "Failed to update project", "details": str(e)}, 500
# 
#     def delete(self, project_id):
#         project = Project.query.get_or_404(project_id)
#         db.session.delete(project)
#         db.session.commit()
#         return {"message": "Project deleted successfully"}, 204
