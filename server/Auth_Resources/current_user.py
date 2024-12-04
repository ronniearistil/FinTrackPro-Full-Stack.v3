from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User

class CurrentUserResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get_or_404(user_id)
        return {"id": user.id, "name": user.name, "email": user.email}, 200

