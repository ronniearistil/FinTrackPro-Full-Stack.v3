# from flask_restful import Resource
# from flask import request
# from models import User
# 
# class LoginResource(Resource):
#     def post(self):
#         data = request.get_json()
#         email = data.get("email")
#         password = data.get("password")
# 
#         if not email or not password:
#             return {"error": "Email and password are required."}, 400
# 
#         user = User.query.filter_by(email=email).first()
#         if not user or not user.check_password(password):
#             return {"error": "Invalid email or password."}, 401
# 
#         return {
#             "message": "Login successful",
#             "user": user.to_dict()
#         }, 200
