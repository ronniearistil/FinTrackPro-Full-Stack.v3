from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from extensions import db
from models import RevokedToken

class LogoutResource(Resource):
    @jwt_required()
    def post(self):
        try:
            jti = get_jwt()["jti"]  # JWT ID
            user_id = get_jwt_identity()

            # Check if the token is already revoked
            if RevokedToken.query.filter_by(jti=jti).first():
                return {"error": "User is already logged out"}, 400

            # Add the jti to the RevokedToken table
            revoked_token = RevokedToken(jti=jti, user_id=user_id)
            db.session.add(revoked_token)
            db.session.commit()

            return {"message": "Successfully logged out"}, 200

        except Exception as e:
            return {"error": "An error occurred during logout", "details": str(e)}, 500
