from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    projects = db.relationship('Project', back_populates='owner', lazy='dynamic')

    def __repr__(self):
        return f"<User {self.name}>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "project_count": self.projects.count()
        }

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
        return {
            "id": self.id,
            "name": self.name,
            "budgeted_cost": self.budgeted_cost,
            "actual_cost": self.actual_cost,
            "status": self.status,
            "start_date": self.start_date.strftime("%Y-%m-%d") if self.start_date else None,
            "end_date": self.end_date.strftime("%Y-%m-%d") if self.end_date else None,
            "user_id": self.user_id,
        }

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    project = db.relationship('Project', back_populates='expenses')

    def __repr__(self):
        return f"<Expense {self.name} - {self.amount}>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "amount": self.amount,
            "category": self.category,
            "project_id": self.project_id
        }







