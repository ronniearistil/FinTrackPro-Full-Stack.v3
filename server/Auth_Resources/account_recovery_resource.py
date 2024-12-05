from flask_restful import Resource
from flask import request, current_app
from models import User
from extensions import db, mail
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from flask_mail import Message

class AccountRecoveryResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")

        if not email:
            return {"error": "Email is required"}, 400

        user = User.query.filter_by(email=email).first()

        # Always return success to avoid enumeration attacks
        if not user:
            return {"message": "If the email exists, a recovery email has been sent."}, 200

        serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
        recovery_token = serializer.dumps(email, salt="password-recovery")
        recovery_link = f"{current_app.config.get('FRONTEND_URL', 'http://localhost:3000')}/reset-password/{recovery_token}"

        try:
            msg = Message(
                subject="Password Recovery",
                sender=current_app.config["MAIL_USERNAME"],
                recipients=[email],
                body=f"Click the link to reset your password: {recovery_link}"
            )
            mail.send(msg)
        except Exception as e:
            current_app.logger.error(f"Email send error: {str(e)}")
            return {"error": "Failed to send recovery email", "details": str(e)}, 500

        return {"message": "Recovery email sent successfully"}, 200

    def get(self):
        token = request.args.get("token")
        if not token:
            return {"error": "Token is required"}, 400

        serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
        try:
            email = serializer.loads(token, salt="password-recovery", max_age=3600)
        except SignatureExpired:
            return {"error": "Token has expired"}, 400
        except BadSignature:
            return {"error": "Invalid token"}, 400

        return {"message": "Token is valid", "email": email}, 200

    def put(self):
        data = request.get_json()
        token = data.get("token")
        new_password = data.get("new_password")

        if not token or not new_password:
            return {"error": "Token and new password are required"}, 400

        if len(new_password) < 8:
            return {"error": "Password must be at least 8 characters long"}, 400

        serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
        try:
            email = serializer.loads(token, salt="password-recovery", max_age=3600)
        except SignatureExpired:
            return {"error": "Token has expired"}, 400
        except BadSignature:
            return {"error": "Invalid token"}, 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return {"error": "User not found"}, 404

        user.set_password(new_password)
        db.session.commit()

        current_app.logger.info(f"Password reset successfully for email: {email}")
        return {"message": "Password has been reset successfully"}, 200
