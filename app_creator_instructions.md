Generating Secret Key. 
Run the Python interpreter in CLI "python3
" Followed by "import secrets
print(secrets.token_hex(24))
"

Flask Database Migration Quick Notes:
Summary of Commands:
flask db init — Initialize the migration environment (run once).
flask db migrate -m "update description" — Generate a migration script.
flask db upgrade — Apply the migration to the database.

Or 
- cd server
- export FLASK_APP=app.py
- flask db init
- flask db migrate -m "Initial migration"

Run Python App
- python app.py

Run Seed.py
- python seed.py
