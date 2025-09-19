# API Specifications for StudyFlow

This document outlines the API endpoints available in the StudyFlow application.

---

## 1. Topics API

### Endpoint: `/api/topics`

This endpoint is used for managing study topics.

#### `POST /api/topics`

*   **Description:** Creates a new study topic.
*   **Authentication:** Requires an authenticated user session. The `creator_id` will be automatically associated with the created topic.
*   **Request Body:**
    ```json
    {
      "title": "string",
      "description": "string"
    }
    ```
    *   `title` (required): The title of the topic.
    *   `description` (required): A brief description of the topic.
*   **Response (Success - 201 Created):**
    ```json
    {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "creator_id": "uuid",
      "created_at": "timestamp"
    }
    ```
*   **Response (Error - 401 Unauthorized):**
    ```json
    {
      "error": "Unauthorized"
    }
    ```
*   **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "error": "string"
    }
    ```

---

## 2. Authentication API

### Endpoint: `/api/auth`

This endpoint handles user authentication flows.

#### `POST /api/auth/signup`

*   **Description:** Registers a new user.
*   **Authentication:** None required.
*   **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
    *   `email` (required): User's email address.
    *   `password` (required): User's password.
*   **Response (Success - 200 OK):**
    ```json
    {
      "message": "User registered successfully. Check your email for verification."
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
      "error": "string"
    }
    ```
*   **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "error": "string"
    }
    ```

#### `POST /api/auth/signin`

*   **Description:** Authenticates an existing user.
*   **Authentication:** None required.
*   **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
    *   `email` (required): User's email address.
    *   `password` (required): User's password.
*   **Response (Success - 200 OK):**
    ```json
    {
      "message": "User logged in successfully."
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
      "error": "string"
    }
    ```
*   **Response (Error - 401 Unauthorized):**
    ```json
    {
      "error": "Invalid credentials"
    }
    ```
*   **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "error": "string"
    }
    ```

#### `POST /api/auth/signout`

*   **Description:** Logs out the current user.
*   **Authentication:** Requires an authenticated user session.
*   **Request Body:** None.
*   **Response (Success - 200 OK):**
    ```json
    {
      "message": "User logged out successfully."
    }
    ```
*   **Response (Error - 401 Unauthorized):**
    ```json
    {
      "error": "Unauthorized"
    }
    ```
*   **Response (Error - 500 Internal Server Error):**
    ```json
    {
      "error": "string"
    }
    ```

---

<!-- Add more API endpoints here as they are developed -->