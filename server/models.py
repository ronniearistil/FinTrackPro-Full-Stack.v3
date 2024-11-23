from app import db, bcrypt

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)  # Password hashing
    role = db.Column(db.String(20), default="user", nullable=False)  # Role for authorization
    is_active = db.Column(db.Boolean, default=True)  # Account status
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())
    projects = db.relationship('Project', back_populates='owner', lazy='dynamic')

    def __repr__(self):
        return f"<User {self.name}>"

    def to_dict(self):
        """Convert User instance to dictionary."""
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
            "is_active": self.is_active,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S") if self.created_at else None,
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S") if self.updated_at else None,
            "projects": [project.id for project in self.projects]  # Only return project IDs for simplicity
        }

    def set_password(self, password):
        """Set a hashed password."""
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        """Verify a hashed password."""
        return bcrypt.check_password_hash(self.password_hash, password)


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    budgeted_cost = db.Column(db.Float, nullable=False)
    actual_cost = db.Column(db.Float, default=0.0)
    projected_revenue = db.Column(db.Float, nullable=True)
    actual_revenue = db.Column(db.Float, default=0.0)
    projected_profit = db.Column(db.Float, nullable=True)
    actual_profit = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())
    project_manager = db.Column(db.String(100), nullable=True)
    category = db.Column(db.String(50), nullable=True)
    progress_percentage = db.Column(db.Float, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    owner = db.relationship('User', back_populates='projects')
    expenses = db.relationship('Expense', back_populates='project', lazy='dynamic')

    def __repr__(self):
        return f"<Project {self.name}>"

    def to_dict(self):
        """Convert Project instance to dictionary."""
        return {
            "id": self.id,
            "name": self.name,
            "budgeted_cost": self.budgeted_cost,
            "actual_cost": self.actual_cost,
            "projected_revenue": self.projected_revenue,
            "actual_revenue": self.actual_revenue,
            "projected_profit": self.projected_profit,
            "actual_profit": self.actual_profit,
            "status": self.status,
            "start_date": self.start_date.strftime("%Y-%m-%d") if self.start_date else None,
            "end_date": self.end_date.strftime("%Y-%m-%d") if self.end_date else None,
            "category": self.category,
            "progress_percentage": self.progress_percentage,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S") if self.created_at else None,
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S") if self.updated_at else None,
            "project_manager": self.project_manager,
            "user_id": self.user_id,
            "expenses": [expense.id for expense in self.expenses]  # Only return expense IDs for simplicity
        }


class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())
    project = db.relationship('Project', back_populates='expenses')

    def __repr__(self):
        return f"<Expense {self.name} - {self.amount}>"

    def to_dict(self):
        """Convert Expense instance to dictionary."""
        return {
            "id": self.id,
            "name": self.name,
            "amount": self.amount,
            "category": self.category,
            "project_id": self.project_id,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S") if self.created_at else None,
            "updated_at": self.updated_at.strftime("%Y-%m-%d %H:%M:%S") if self.updated_at else None
        }









