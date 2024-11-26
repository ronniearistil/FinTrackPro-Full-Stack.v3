from marshmallow import Schema, fields, validate


class LoginSchema(Schema):
    email = fields.Email(required=True, error_messages={"invalid": "Invalid email format"})
    password = fields.String(
        required=True, validate=validate.Length(min=8), error_messages={"invalid": "Password must be at least 8 characters"}
    )
