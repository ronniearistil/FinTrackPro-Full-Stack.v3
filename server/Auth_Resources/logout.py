# from flask import make_response
# from flask_restful import Resource
# from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity, unset_access_cookies
# from extensions import db
# class LogoutResource(Resource):
#     @jwt_required()
#     def delete(self):
#         try:
#             import ipdb; ipdb.set_trace()
#             response = make_response("", 204)
#             unset_access_cookies(response)
#             return response
# 
#         except Exception as e:
#             return {"error": "An error occurred during logout", "details": str(e)}, 500

from flask import make_response
from flask_restful import Resource
from flask_jwt_extended import jwt_required, unset_access_cookies, unset_refresh_cookies
import logging

class LogoutResource(Resource):
    @jwt_required(optional=False)  # Allows the route to handle missing or expired tokens
    def delete(self):
        try:
            # Clear cookies for access and refresh tokens
            response = make_response({"message": "Successfully logged out"}, 204)
            unset_access_cookies(response)
            unset_refresh_cookies(response)
            return response
        except Exception as e:
            logging.error(f"Logout failed: {e}")
            return {"error": "An error occurred during logout", "details": str(e)}, 500

