# schemas.py

from extensions import ma
from models import User, Project, Expense
from marshmallow import fields, validate, validates, ValidationError

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_relationships = True
        load_instance = False  # Ensure it returns a dictionary
        exclude = ("password_hash",)  # Prevent password_hash from being exposed

    password = fields.String(
        load_only=True,
        required=True,
        validate=validate.Length(min=8, error="Password must be at least 8 characters long")
    )

    email = fields.Email(required=True, error_messages={"invalid": "Invalid email format"})

    @validates("email")
    def validate_email(self, value):
        if User.query.filter_by(email=value).first():
            raise ValidationError("Email address is already in use.")

class ProjectSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Project
        include_relationships = True
        load_instance = False  # Always return a dictionary

    # Fields
    name = fields.String(required=True, validate=validate.Length(min=1))
    budgeted_cost = fields.Float(required=True, validate=validate.Range(min=0))
    actual_cost = fields.Float(validate=validate.Range(min=0))
    status = fields.String(required=True, validate=validate.OneOf(["In Progress", "Completed", "At Risk"]))
    start_date = fields.Date(required=True)
    end_date = fields.Date(allow_none=True)
    user_id = fields.Integer(required=True, validate=validate.Range(min=1))

    @validates("status")
    def validate_status(self, value):
        valid_statuses = ["In Progress", "Completed", "At Risk"]
        if value not in valid_statuses:
            raise ValidationError(f"Invalid status. Must be one of {valid_statuses}.")

class ExpenseSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Expense
        include_relationships = True
        load_instance = False  # Ensure this returns a dictionary

    name = fields.String(required=True, validate=validate.Length(min=1))
    amount = fields.Float(required=True, validate=validate.Range(min=0))
    project_id = fields.Integer(required=True, validate=validate.Range(min=1))
