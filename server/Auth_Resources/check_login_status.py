from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User

class CheckLoginStatusResource(Resource):
    @jwt_required()
    def get(self):
        try:
            user_id = get_jwt_identity()
            user = User.query.get(user_id)
            if not user:
                return {"error": "User not found"}, 404
            return {"message": "User is logged in", "user": {"id": user.id, "email": user.email}}, 200
        except Exception as e:
            return {"error": "An error occurred", "details": str(e)}, 500
