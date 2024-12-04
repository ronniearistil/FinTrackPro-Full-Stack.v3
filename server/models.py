# from extensions import db, bcrypt
# 
# # Association table for many-to-many relationship
# user_projects = db.Table(
#     'user_projects',
#     db.Column('user_id', db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True),
#     db.Column('project_id', db.Integer, db.ForeignKey('projects.id', ondelete='CASCADE'), primary_key=True)
# )
# 
# class User(db.Model):
#     __tablename__ = 'users'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(45), nullable=False)
#     email = db.Column(db.String(50), unique=True, nullable=False)
#     password_hash = db.Column(db.String(128), nullable=False)
#     role = db.Column(db.String(20), default="user", nullable=False)
#     is_active = db.Column(db.Boolean, default=True)
#     created_at = db.Column(db.DateTime, default=db.func.now())
#     updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())
# 
#     projects = db.relationship(
#         'Project',
#         secondary=user_projects,
#         back_populates='collaborators',
#         cascade='all, delete'
#     )
# 
#     def __repr__(self):
#         return f"<User(id={self.id}, name={self.name})>"
# 
#     def to_dict(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "email": self.email,
#             "role": self.role,
#             "is_active": self.is_active,
#             "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S") if self.created_at else None,
#             "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S") if self.updated_at else None,
#             "projects": [project.id for project in self.projects]
#         }
# 
#     def set_password(self, password):
#         self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
# 
#     def check_password(self, password):
#         return bcrypt.check_password_hash(self.password_hash, password)
# 
# 
# class Project(db.Model):
#     __tablename__ = 'projects'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     budgeted_cost = db.Column(db.Float, nullable=False)
#     actual_cost = db.Column(db.Float, default=0.0)
#     status = db.Column(db.String(50), nullable=False)
#     progress_percentage = db.Column(db.Integer, default=0)  # New field
#     category = db.Column(db.String(50), default="General")  # New field
#     start_date = db.Column(db.Date, nullable=False)
#     end_date = db.Column(db.Date, nullable=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
# 
#     # Many-to-Many Relationship with users
#     collaborators = db.relationship(
#         'User',
#         secondary=user_projects,
#         back_populates='projects',
#         cascade='all'  # Removed `delete-orphan`
#     )
# 
#     # One-to-Many Relationship with expenses
#     expenses = db.relationship('Expense', back_populates='project', lazy='dynamic', cascade='all, delete-orphan')
# 
# # methods to calculate and update actual_cost based on the total of all related expenses.
#     def update_actual_cost(self):
#         """Recalculate and update the actual cost based on expenses."""
#         self.actual_cost = sum(expense.amount for expense in self.expenses)
#         db.session.commit()
#         
#     def __repr__(self):
#         return f"<Project(id={self.id}, name={self.name}, user_id={self.user_id})>"
# 
#     def to_dict(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "budgeted_cost": self.budgeted_cost,
#             "actual_cost": self.actual_cost,
#             "status": self.status,
#             "start_date": self.start_date.strftime("%Y-%m-%d") if self.start_date else None,
#             "end_date": self.end_date.strftime("%Y-%m-%d") if self.end_date else None,
#             "user_id": self.user_id,
#             "expenses": [expense.id for expense in self.expenses],
#             "collaborators": [user.id for user in self.collaborators]
#         }
# 
# class Expense(db.Model):
#     __tablename__ = 'expenses'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     amount = db.Column(db.Float, nullable=False)
#     project_id = db.Column(db.Integer, db.ForeignKey('projects.id', ondelete='CASCADE'), nullable=False)
#     project = db.relationship('Project', back_populates='expenses')
# 
#     def __repr__(self):
#         return f"<Expense(id={self.id}, name={self.name}, amount={self.amount})>"
# 
#     def to_dict(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "amount": self.amount,
#             "project_id": self.project_id,
#         }


from extensions import db, bcrypt
from sqlalchemy.orm import validates
from marshmallow import ValidationError

# Association table for many-to-many relationship
user_projects = db.Table(
    'user_projects',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True),
    db.Column('project_id', db.Integer, db.ForeignKey('projects.id', ondelete='CASCADE'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default="user", nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    projects = db.relationship(
        'Project',
        secondary=user_projects,
        back_populates='collaborators',
        cascade='all, delete'
    )

    def __repr__(self):
        return f"<User(id={self.id}, name={self.name})>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
            "is_active": self.is_active,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S") if self.created_at else None,
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S") if self.updated_at else None,
            "projects": [project.id for project in self.projects]
        }

    def set_password(self, password):
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email or '.' not in email:
            raise ValidationError("Invalid email format.")
        return email


class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    budgeted_cost = db.Column(db.Float, nullable=False)
    actual_cost = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(50), nullable=False)
    progress_percentage = db.Column(db.Integer, default=0)  # New field
    category = db.Column(db.String(50), default="General")  # New field
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    # Many-to-Many Relationship with users
    collaborators = db.relationship(
        'User',
        secondary=user_projects,
        back_populates='projects',
        cascade='all'
    )

    # One-to-Many Relationship with expenses
    expenses = db.relationship('Expense', back_populates='project', lazy='dynamic', cascade='all, delete-orphan')

    def update_actual_cost(self):
        """Recalculate and update the actual cost based on expenses."""
        self.actual_cost = sum(expense.amount for expense in self.expenses)
        db.session.commit()

    def __repr__(self):
        return f"<Project(id={self.id}, name={self.name}, user_id={self.user_id})>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "budgeted_cost": self.budgeted_cost,
            "actual_cost": self.actual_cost,
            "status": self.status,
            "start_date": self.start_date.strftime("%Y-%m-%d") if self.start_date else None,
            "end_date": self.end_date.strftime("%Y-%m-%d") if self.end_date else None,
            "user_id": self.user_id,
            "expenses": [expense.id for expense in self.expenses],
            "collaborators": [user.id for user in self.collaborators]
        }

    @validates('budgeted_cost')
    def validate_budgeted_cost(self, key, budgeted_cost):
        if budgeted_cost < 0:
            raise ValidationError("Budgeted cost must be a positive value.")
        return budgeted_cost

    @validates('progress_percentage')
    def validate_progress_percentage(self, key, progress_percentage):
        if not (0 <= progress_percentage <= 100):
            raise ValidationError("Progress percentage must be between 0 and 100.")
        return progress_percentage


class Expense(db.Model):
    __tablename__ = 'expenses'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id', ondelete='CASCADE'), nullable=False)
    project = db.relationship('Project', back_populates='expenses')

    def __repr__(self):
        return f"<Expense(id={self.id}, name={self.name}, amount={self.amount})>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "amount": self.amount,
            "project_id": self.project_id,
        }

    @validates('amount')
    def validate_amount(self, key, amount):
        if amount <= 0:
            raise ValidationError("Expense amount must be a positive value.")
        return amount







