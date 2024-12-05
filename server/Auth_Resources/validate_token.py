from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User

class ValidateTokenResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404

        return {
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
            }
        }, 200

