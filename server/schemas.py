# schemas.py

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
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
        load_instance = False

    name = fields.String(required=True, validate=validate.Length(min=1))
    budgeted_cost = fields.Float(required=True, validate=validate.Range(min=0))
    actual_cost = fields.Float(validate=validate.Range(min=0))
    status = fields.String(required=True, validate=validate.OneOf(["In Progress", "Completed", "At Risk"]))
    start_date = fields.Date(required=True)
    end_date = fields.Date(allow_none=True)
    user_id = fields.Integer(required=True, validate=validate.Range(min=1))


    @validates("user_id")
    def validate_user_id(self, value):
        if not User.query.get(value):
            raise ValidationError(f"User with ID {value} does not exist.")


class ExpenseSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Expense
        include_relationships = True
        load_instance = False 

    name = fields.String(required=False, validate=validate.Length(min=1))
    amount = fields.Float(required=False, validate=validate.Range(min=0))
    project_id = fields.Integer(required=False, validate=validate.Range(min=1))



# Refactored Code for final testing

# from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
# from marshmallow import fields, validate, validates, ValidationError
# from extensions import ma
# from models import User, Project, Expense
# 
# # Base schema for common functionality
# class BaseSchema(ma.SQLAlchemyAutoSchema):
#     class Meta:
#         include_relationships = True
#         load_instance = False  # Ensure it returns a dictionary
# 
#     @staticmethod
#     def validate_exists(model, field, value, error_message):
#         """Validates that a record exists in the database."""
#         try:
#             if not model.query.get(value):
#                 raise ValidationError(error_message.format(value=value))
#         except Exception as e:
#             raise ValidationError(f"Validation error occurred: {e}")
# 
# class UserSchema(BaseSchema):
#     class Meta(BaseSchema.Meta):
#         model = User
#         exclude = ("password_hash",)  # Prevent password_hash from being exposed
# 
#     password = fields.String(
#         load_only=True,
#         required=True,
#         validate=validate.Length(min=8, error="Password must be at least 8 characters long")
#     )
#     email = fields.Email(required=True, error_messages={"invalid": "Invalid email format"})
# 
#     @validates("email")
#     def validate_email(self, value):
#         try:
#             if User.query.filter_by(email=value).first():
#                 raise ValidationError("Email address is already in use.")
#         except Exception as e:
#             raise ValidationError(f"Error validating email: {e}")
# 
# class ProjectSchema(BaseSchema):
#     class Meta(BaseSchema.Meta):
#         model = Project
# 
#     name = fields.String(required=True, validate=validate.Length(min=1))
#     budgeted_cost = fields.Float(required=True, validate=validate.Range(min=0))
#     actual_cost = fields.Float(validate=validate.Range(min=0))
#     status = fields.String(required=True, validate=validate.OneOf(["In Progress", "Completed", "At Risk"]))
#     start_date = fields.Date(required=True)
#     end_date = fields.Date(allow_none=True)
#     user_id = fields.Integer(required=True, validate=validate.Range(min=1))
# 
#     @validates("user_id")
#     def validate_user_id(self, value):
#         self.validate_exists(User, "user_id", value, "User with ID {value} does not exist.")
# 
# class ExpenseSchema(BaseSchema):
#     class Meta(BaseSchema.Meta):
#         model = Expense
# 
#     name = fields.String(required=False, validate=validate.Length(min=1))
#     amount = fields.Float(required=False, validate=validate.Range(min=0))
#     project_id = fields.Integer(required=False, validate=validate.Range(min=1))
# 
#     @validates("project_id")
#     def validate_project_id(self, value):
#         self.validate_exists(Project, "project_id", value, "Project with ID {value} does not exist.")
