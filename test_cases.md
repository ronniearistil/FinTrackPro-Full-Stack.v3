Here’s how you can test POST, PATCH, and DELETE operations for Users, Projects, and Expenses. Make sure your server is running before testing these.

1. Users
1.1. POST a User
Endpoint: POST /users

Payload:

json
Copy code
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "user"
}
Curl Command:

bash
Copy code
curl -X POST http://127.0.0.1:5555/users \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "user"
}'
1.2. PATCH a User
Endpoint: PATCH /users/<user_id>

Payload:

json
Copy code
{
  "name": "Johnathan Doe",
  "role": "admin"
}
Curl Command:

bash
Copy code
curl -X PATCH http://127.0.0.1:5555/users/1 \
-H "Content-Type: application/json" \
-d '{
  "name": "Johnathan Doe",
  "role": "admin"
}'
1.3. DELETE a User
Endpoint: DELETE /users/<user_id>

Curl Command:

bash
Copy code
curl -X DELETE http://127.0.0.1:5555/users/1
2. Projects
2.1. POST a Project
Endpoint: POST /projects

Payload:

json
Copy code
{
  "name": "Website Redesign",
  "budgeted_cost": 15000,
  "status": "In Progress",
  "start_date": "2023-11-01",
  "end_date": "2023-12-15",
  "user_id": 1
}
Curl Command:

bash
Copy code
curl -X POST http://127.0.0.1:5555/projects \
-H "Content-Type: application/json" \
-d '{
  "name": "Website Redesign",
  "budgeted_cost": 15000,
  "status": "In Progress",
  "start_date": "2023-11-01",
  "end_date": "2023-12-15",
  "user_id": 1
}'
2.2. PATCH a Project
Endpoint: PATCH /projects/<project_id>

Payload:

json
Copy code
{
  "status": "Completed",
  "budgeted_cost": 16000
}
Curl Command:

bash
Copy code
curl -X PATCH http://127.0.0.1:5555/projects/1 \
-H "Content-Type: application/json" \
-d '{
  "status": "Completed",
  "budgeted_cost": 16000
}'
2.3. DELETE a Project
Endpoint: DELETE /projects/<project_id>

Curl Command:

bash
Copy code
curl -X DELETE http://127.0.0.1:5555/projects/1
3. Expenses
3.1. POST an Expense
Endpoint: POST /expenses

Payload:

json
Copy code
{
  "name": "Domain Registration",
  "amount": 12.99,
  "project_id": 1
}
Curl Command:

bash
Copy code
curl -X POST http://127.0.0.1:5555/expenses \
-H "Content-Type: application/json" \
-d '{
  "name": "Domain Registration",
  "amount": 12.99,
  "project_id": 1
}'
3.2. PATCH an Expense
Endpoint: PATCH /expenses/<expense_id>

Payload:

json
Copy code
{
  "amount": 15.00
}
Curl Command:

bash
Copy code
curl -X PATCH http://127.0.0.1:5555/expenses/1 \
-H "Content-Type: application/json" \
-d '{
  "amount": 15.00
}'
3.3. DELETE an Expense
Endpoint: DELETE /expenses/<expense_id>

Curl Command:

bash
Copy code
curl -X DELETE http://127.0.0.1:5555/expenses/1
