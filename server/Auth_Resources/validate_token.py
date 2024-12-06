from venv import logger
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User

class ValidateTokenResource(Resource):
    @jwt_required()
    def get(self):
        logger.debug("Processing validate-token request")

        try:
            user_id = get_jwt_identity()
            logger.debug(f"Extracted user_id from token: {user_id}")
            if not user_id:
                return {"error": "Invalid token - No user ID found"}, 401
            
            user = User.query.get(user_id)
            logger.debug(f"User fetched from database: {user}")
            if not user:
                return {"error": "User not found"}, 404
            return {
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                }
            }, 200

        except Exception as e:
            logger.error(f"Token validation failed: {str(e)}")
            return {"error": "Token validation failed", "details": str(e)}, 500