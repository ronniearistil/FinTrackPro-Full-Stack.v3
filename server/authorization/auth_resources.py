from flask_restful import Resource
from flask import request
from marshmallow import ValidationError
from models import User
from schemas import UserSchema
from extensions import db, bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


class SignupResource(Resource):
    def post(self):
        try:
            data = request.get_json()
            user_schema = UserSchema()
            user_data = user_schema.load(data)

            # Check if email already exists
            if User.query.filter_by(email=user_data['email']).first():
                return {"error": "Email already exists"}, 400

            user = User(**user_data)
            user.password = user_data['password']  # Hashes password automatically
            db.session.add(user)
            db.session.commit()

            # Generate access token
            access_token = create_access_token(identity=user.id)
            return {"message": "Signup successful", "access_token": access_token}, 201

        except ValidationError as err:
            return {"error": "Validation error", "details": err.messages}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to sign up", "details": str(e)}, 500


class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {"error": "Email and password are required."}, 400

        user = User.query.filter_by(email=email).first()
        if not user or not bcrypt.check_password_hash(user._password_hash, password):
            return {"error": "Invalid email or password."}, 401

        # Generate access token
        access_token = create_access_token(identity=user.id)
        return {"message": "Login successful", "access_token": access_token}, 200


class LogoutResource(Resource):
    @jwt_required()
    def post(self):
        # JWT tokens can be revoked if you implement token revocation logic
        return {"message": "Logout successful"}, 200


class CurrentUserResource(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        user = User.query.get_or_404(current_user_id)
        return {"user": user.to_dict()}, 200
