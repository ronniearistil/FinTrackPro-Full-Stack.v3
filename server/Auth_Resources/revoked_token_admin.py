# from flask_restful import Resource
# from flask_jwt_extended import jwt_required, get_jwt
# from models import RevokedToken
# from extensions import db
# from schemas import RevokedTokenSchema
# 
# class RevokedTokenAdminResource(Resource):
#     @jwt_required()
#     def get(self):
#         # Check if the user has admin privileges
#         claims = get_jwt()
#         if not claims.get("is_admin"):
#             return {"error": "Admin privileges required"}, 403
# 
#         # Retrieve all revoked tokens
#         tokens = RevokedToken.query.all()
#         schema = RevokedTokenSchema(many=True)
#         return schema.dump(tokens), 200
