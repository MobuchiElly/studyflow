# API Specifications

This document describes the API endpoints for authentication, notes, and topics in the StudyFlow application.  
All routes are built on Next.js API Routes with Supabase as the backend.

---

## Authentication

### Register a User
**Endpoint:** `POST /api/auth/register`  
**Description:** Registers a new user with email and password. Sends a confirmation email.  

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "strongpassword123"
}

Responses:

201 Created

{
  "message": "Registration successful! Please check your email to confirm your account."
}
400 Bad Request


{ "error": "Email and password are required" }
500 Internal Server Error


{ "error": "Internal server error" }
Login
Endpoint: POST /api/auth/login
Description: Logs in a user with email and password. Returns session and user info.

Request Body:


{
  "email": "user@example.com",
  "password": "strongpassword123"
}
Responses:

200 OK


{
  "user": { "id": "uuid", "email": "user@example.com" },
  "session": { "access_token": "jwt-token", "expires_at": 1234567890 }
}
400 Bad Request

{ "error": "Invalid login credentials" }
500 Internal Server Error


{ "error": "Internal server error" }
Logout
Endpoint: POST /api/auth/logout
Description: Logs out the currently authenticated user.

Responses:

200 OK

{ "message": "Successfully logged out" }
400 Bad Request

{ "error": "Failed to log out" }
500 Internal Server Error

{ "error": "Internal server error" }
Notes
Create Note
Endpoint: POST /api/notes
Description: Creates a new note linked to the authenticated user.

Request Body:


{
  "title": "Study Binary Trees",
  "content": "Binary trees are hierarchical structures...",
  "topic_id": "uuid-of-topic"
}
Responses:

201 Created


{
  "id": "note-uuid",
  "title": "Study Binary Trees",
  "content": "Binary trees are hierarchical structures...",
  "topic_id": "uuid-of-topic",
  "user_id": "user-uuid"
}
401 Unauthorized


{ "error": "Unauthorised request" }
500 Internal Server Error


{ "error": "Internal server error" }
Get Notes
Endpoint: GET /api/notes
Description: Fetch all notes belonging to the authenticated user.

Responses:

200 OK


[
  {
    "id": "note-uuid",
    "title": "Study Binary Trees",
    "content": "Binary trees are hierarchical structures...",
    "topic_id": "uuid-of-topic",
    "user_id": "user-uuid"
  }
]
401 Unauthorized


{ "error": "User not authenticated" }
Update Note
Endpoint: PUT /api/notes/:id
Description: Updates an existing note if the user owns it.

Request Body:


{
  "title": "Updated Note Title",
  "content": "Updated note content",
  "topic_id": "uuid-of-topic"
}
Responses:

200 OK


{
  "id": "note-uuid",
  "title": "Updated Note Title",
  "content": "Updated note content",
  "topic_id": "uuid-of-topic",
  "user_id": "user-uuid"
}
404 Not Found


{ "error": "Note not found or unauthorized" }
Delete Note
Endpoint: DELETE /api/notes/:id
Description: Deletes a note if the user owns it.

Responses:

200 OK


{ "message": "Note deleted successfully" }
404 Not Found


{ "error": "Note not found or unauthorized" }
Topics
Update Topic
Endpoint: PUT /api/topics/:id
Description: Updates an existing topic if the user owns it.

Request Body:


{
  "title": "Data Structures",
  "description": "Covers trees, graphs, and heaps"
}
Responses:

200 OK


{
  "id": "topic-uuid",
  "title": "Data Structures",
  "description": "Covers trees, graphs, and heaps",
  "user_id": "user-uuid"
}
404 Not Found


{ "error": "Topic not found or unauthorized" }
Delete Topic
Endpoint: DELETE /api/topics/:id
Description: Deletes a topic if the user owns it.

Responses:

200 OK


{ "message": "Topic deleted successfully" }
404 Not Found


{ "error": "Topic not found or unauthorized" }
Authentication Notes
All protected routes (/api/notes/*, /api/topics/*) require the user to be authenticated via Supabase.

Responses are always JSON with clear error messages.