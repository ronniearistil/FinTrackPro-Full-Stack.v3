from flask_restful import Resource
from flask import request
from marshmallow import ValidationError
from models import User
from schemas import UserSchema
from extensions import db

class UserResource(Resource):
    def get(self, user_id=None):
        if user_id:
            user = User.query.get_or_404(user_id)
            return {"user": user.to_dict()}, 200
        users = User.query.all()
        return {"users": [u.to_dict() for u in users]}, 200

    def post(self):
        try:
            data = request.get_json()
            if not data:
                return {"error": "No data provided or invalid JSON format"}, 400

            user_schema = UserSchema()
            user_data = user_schema.load(data)

            password = user_data.pop('password', None)
            if not password:
                return {"error": "Password is required"}, 400

            user = User(**user_data)
            user.set_password(password)

            db.session.add(user)
            db.session.commit()
            return user_schema.dump(user), 201

        except ValidationError as err:
            return {"error": "Validation error", "details": err.messages}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to create user", "details": str(e)}, 500

    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted successfully"}, 204

    def patch(self, user_id):
        user_schema = UserSchema()
        user = User.query.get_or_404(user_id)
        try:
            data = request.get_json()
            if not data:
                return {"error": "No data provided or invalid JSON format"}, 400
            user_data = user_schema.load(data, partial=True)
            for key, value in user_data.items():
                if key == 'password':
                    user.set_password(value)
                else:
                    setattr(user, key, value)
            db.session.commit()
            return user_schema.dump(user), 200
        except ValidationError as err:
            return {"error": "Validation error", "details": err.messages}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to update user", "details": str(e)}, 500
        
