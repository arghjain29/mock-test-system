Mock Test API
=============

This is a backend API for managing mock tests, users, and questions in an educational application. It allows users to register, log in, create and manage questions, generate mock tests, submit answers, and track their scores and test history.

Features
--------

*   **User Management:** Register, login, update, and delete users.
    
*   **Question Management:** Create, read, update, and delete questions.
    
*   **Mock Test Management:** Generate mock tests based on selected criteria and submit answers.
    
*   **Test History:** Retrieve past test scores and details.
    
*   **JWT Authentication:** Secure endpoints with JWT for protected routes.
    

Technologies Used
-----------------

*   **Node.js**: JavaScript runtime environment
    
*   **Express.js**: Web framework for Node.js
    
*   **MongoDB**: NoSQL database for storing data
    
*   **Mongoose**: MongoDB ODM for object data modeling
    
*   **JSON Web Token (JWT)**: Authentication and authorization
    
*   **bcryptjs**: Password hashing
    
*   **dotenv**: For managing environment variables
    

Postman Collection Link: [LINK](https://www.postman.com/technical-cosmologist-52026975/workspace/my-workspace/collection/41195186-ae0d5ff9-9cf0-4725-b8b6-ec52d4b5deac?action=share&creator=41195186)

API Endpoints
-------------

### User Routes

1.  **POST /api/users/register** – Register a new user.
    
2.  **POST /api/users/login** – Login and generate a JWT token.
    
3.  **GET /api/users/** – Get all users.
    
4.  **GET /api/users/:id** – Get user details by ID.
    
5.  **PUT /api/users/:id** – Update user details (requires authentication).
    
6.  **DELETE /api/users/:id** – Delete a user by ID (requires authentication).
    

### Question Routes

1.  **POST /api/questions** – Create a new question.
    
2.  **GET /api/questions** – Get all questions.
    
3.  **GET /api/questions/:id** – Get a specific question by ID.
    
4.  **PUT /api/questions/:id** – Update a question.
    
5.  **DELETE /api/questions/:id** – Delete a question.
    

### Mock Test Routes

1.  **POST /api/mock-test/get-questions** – Get questions for a mock test (requires authentication).
    
2.  **POST /api/mock-test/submit-test** – Submit answers for a mock test (requires authentication).
    
3.  **GET /api/mock-test/history** – Get the user's test history (requires authentication).
    

Installation
------------

To get started with the API, follow the steps below:

1.  git clone https://github.com/yourusername/mock-test-api.gitcd mock-test-api
    
2.  npm install
    
3.  JWT\_SECRET=your\_jwt\_secret\_keyMONGODB\_URI=your\_mongodb\_connection\_string
    
4.  npm startThe API will be available at http://localhost:5000.
    

Testing with Postman
--------------------

Use the provided Postman documentation for detailed API usage. Ensure you include the Authorization header with a valid JWT token for routes that require authentication.

Contributing
------------

Feel free to fork the repository and create pull requests. Ensure that you follow the following steps for contributing:

1.  Fork the repository.
    
2.  Create a new branch.
    
3.  Make your changes.
    
4.  Commit and push your changes to your forked repository.
    
5.  Submit a pull request.
    

License
-------

This project is licensed under the MIT License - see the LICENSE file for details.