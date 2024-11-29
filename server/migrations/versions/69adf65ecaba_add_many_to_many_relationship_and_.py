from alembic import op
import sqlalchemy as sa
from sqlalchemy import inspect


# Revision identifiers, used by Alembic.
revision = '69adf65ecaba'
down_revision = '1490acd6c8b0'
branch_labels = None
depends_on = None


def constraint_exists(conn, table_name, constraint_name):
    inspector = inspect(conn)
    constraints = inspector.get_foreign_keys(table_name)
    return any(c['name'] == constraint_name for c in constraints)


def index_exists(conn, table_name, index_name):
    inspector = inspect(conn)
    indexes = inspector.get_indexes(table_name)
    return any(index['name'] == index_name for index in indexes)


def upgrade():
    conn = op.get_bind()

    # Modify the 'users' table
    with op.batch_alter_table('users') as batch_op:
        # Add the new column '_password_hash' with a default value
        batch_op.add_column(sa.Column('_password_hash', sa.String(60), nullable=False, server_default='default_hashed_password'))

        # Drop the old column 'password_hash'
        batch_op.drop_column('password_hash')

        # Add or recreate the unique index on 'email'
        batch_op.create_index('ix_users_email', ['email'], unique=True)

    # Modify the 'projects' table
    with op.batch_alter_table('projects') as batch_op:
        if constraint_exists(conn, 'projects', 'fk_projects_user_id'):
            batch_op.drop_constraint('fk_projects_user_id', type_='foreignkey')
        batch_op.create_foreign_key('fk_projects_user_id', 'users', ['user_id'], ['id'], ondelete='CASCADE')
        if not index_exists(conn, 'projects', 'ix_projects_user_id'):
            batch_op.create_index('ix_projects_user_id', ['user_id'])

    # Modify the 'expenses' table
    with op.batch_alter_table('expenses') as batch_op:
        if constraint_exists(conn, 'expenses', 'fk_expenses_project_id'):
            batch_op.drop_constraint('fk_expenses_project_id', type_='foreignkey')
        batch_op.create_foreign_key('fk_expenses_project_id', 'projects', ['project_id'], ['id'], ondelete='CASCADE')
        if not index_exists(conn, 'expenses', 'ix_expenses_project_id'):
            batch_op.create_index('ix_expenses_project_id', ['project_id'])

    # Create 'user_projects' table
    op.create_table(
        'user_projects',
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('project_id', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('user_id', 'project_id', name='pk_user_projects'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE', name='fk_user_projects_user_id'),
        sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ondelete='CASCADE', name='fk_user_projects_project_id')
    )


def downgrade():
    conn = op.get_bind()

    # Drop the 'user_projects' table if it exists
    op.drop_table('user_projects')

    # Restore constraints and indices in 'projects' table
    with op.batch_alter_table('projects') as batch_op:
        if 'fk_projects_user_id' in [fk['name'] for fk in inspect(conn).get_foreign_keys('projects')]:
            batch_op.drop_constraint('fk_projects_user_id', type_='foreignkey')
        if 'ix_projects_user_id' in [index['name'] for index in inspect(conn).get_indexes('projects')]:
            batch_op.drop_index('ix_projects_user_id')

    # Restore constraints and indices in 'expenses' table
    with op.batch_alter_table('expenses') as batch_op:
        if 'fk_expenses_project_id' in [fk['name'] for fk in inspect(conn).get_foreign_keys('expenses')]:
            batch_op.drop_constraint('fk_expenses_project_id', type_='foreignkey')
        if 'ix_expenses_project_id' in [index['name'] for index in inspect(conn).get_indexes('expenses')]:
            batch_op.drop_index('ix_expenses_project_id')

    # Rename '_password_hash' back to 'password_hash' in 'users' table
    with op.batch_alter_table('users') as batch_op:
        batch_op.add_column(sa.Column('password_hash', sa.String(60), nullable=False, server_default='default_hashed_password'))
        batch_op.drop_column('_password_hash')
        batch_op.drop_index('ix_users_email')

