from flask_restful import Resource
from flask import request
from flask_jwt_extended import create_access_token
from models import User

class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()
        if not user:
            return {"error": "Invalid email or password."}, 401

        # Add a debug print for password match
        print("Checking password for user:", user.email)
        if not user.check_password(password):
            return {"error": "Invalid email or password."}, 401

        token = create_access_token(identity=user.id)
        return {"token": token}, 200

