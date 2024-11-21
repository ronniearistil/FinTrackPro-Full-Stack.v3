from app import ma
from models import User, Project, Expense
from marshmallow import fields, validate, validates, ValidationError

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_relationships = True
        load_instance = True
        exclude = ("password_hash",)  # Exclude sensitive field

    # Add a password field for validation and creation
    password = fields.String(
        load_only=True,
        required=True,
        validate=validate.Length(min=8, error="Password must be at least 8 characters long")
    )
    
    # Add email validation
    email = fields.Email(required=True, error_messages={"invalid": "Invalid email format"})

    @validates("email")
    def validate_email(self, value):
        """Ensure unique email addresses."""
        if User.query.filter_by(email=value).first():
            raise ValidationError("Email address is already in use.")

class ProjectSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Project
        include_relationships = True
        load_instance = True

    # Require user_id and validate
    user_id = fields.Integer(required=True, validate=validate.Range(min=1, error="Invalid user_id"))
    budgeted_cost = fields.Float(required=True, validate=validate.Range(min=0, error="Budgeted cost must be non-negative"))
    actual_cost = fields.Float(validate=validate.Range(min=0, error="Actual cost must be non-negative"))
    projected_revenue = fields.Float(validate=validate.Range(min=0, error="Projected revenue must be non-negative"))
    actual_revenue = fields.Float(validate=validate.Range(min=0, error="Actual revenue must be non-negative"))
    projected_profit = fields.Float(validate=validate.Range(min=0, error="Projected profit must be non-negative"))
    actual_profit = fields.Float(validate=validate.Range(min=0, error="Actual profit must be non-negative"))
    
    @validates("status")
    def validate_status(self, value):
        """Ensure status is valid."""
        valid_statuses = ["In Progress", "Completed", "At Risk"]
        if value not in valid_statuses:
            raise ValidationError(f"Invalid status. Must be one of {valid_statuses}.")

class ExpenseSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Expense
        include_relationships = True
        load_instance = True

    # Require project_id and validate
    project_id = fields.Integer(required=True, validate=validate.Range(min=1, error="Invalid project_id"))
    amount = fields.Float(required=True, validate=validate.Range(min=0, error="Amount must be non-negative"))

    @validates("category")
    def validate_category(self, value):
        """Ensure category is not empty."""
        if not value or value.strip() == "":
            raise ValidationError("Category cannot be empty.")

