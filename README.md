# StudyFlow

An AI-assisted **note-taking and topic management app** that helps learners organize their study materials.  
This is an **MVP** built as part of the ALX Capstone project: *Planning with AI Intentionally*.

---

## Project Title & Description

**StudyFlow – AI-Powered Note and Topic Organizer**

StudyFlow is a lightweight application that enables learners to create, manage, and organize their study notes and associated topics.  

### Who it's for
- Students organizing lecture notes
- Professionals documenting research
- Self-learners building personal knowledge bases

### Why it matters
Effective organization is key to learning. StudyFlow provides a simple way to manage notes and topics, laying the groundwork for future AI features like content summarization and intelligent topic linking.

---

## Tech Stack
- **Languages**: JavaScript, TypeScript
- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router) + [TypeScript](https://www.typescriptlang.org/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)  
- **Backend**: Next.js API Routes (serverless functions)  
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL + Auth)  
- **Testing**: Jest (unit/integration), Playwright (end-to-end)  
- **Version Control**: Git + GitHub  
- **Deployment**: [Vercel](https://vercel.com/)

---

## Setup & Run Instructions

To get StudyFlow up and running on your local machine, follow these steps:

1.  **Clone the repository**:
    Open your terminal or command prompt and run:
    ```bash
    git clone https://github.com/MobuchiElly/studyflow.git
    cd studyflow
    ```

2.  **Install dependencies**:
    Navigate into the project directory and install the required Node.js packages:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    StudyFlow uses Supabase for its database and authentication. You'll need to configure your Supabase project.
    *   Create a `.env.local` file in the root of your project by copying the provided `.env.example`:
        ```bash
        cp .env.example .env.local
        ```
    *   Open `.env.local` and fill in your Supabase project details. You can find these in your Supabase project settings under "API":
        ```
        NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
        NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
        ```
    *   Ensure your Supabase project has the necessary tables and Row Level Security (RLS) policies configured as described in the Database Schema section below.

4.  **Run the development server**:
    Start the Next.js development server:
    ```bash
    npm run dev
    ```

5.  **Visit the app**:
    Open your web browser and navigate to [http://localhost:3000](http://localhost:3000). The application should now be running locally.

---

## Database Schema Overview

StudyFlow leverages Supabase (PostgreSQL) with Row Level Security (RLS) enabled for secure data access. Below is a summary of the key tables and their relationships:

*   **`users`**: Extends `auth.users`. Stores user-specific profile information.
    *   Fields: `id` (UUID, PK), `email`, `display_name`, `avatar_url`, `created_at`, `updated_at`.
    *   RLS: Users can only read/update their own data.
*   **`topics`**: Stores study topics created by users.
    *   Fields: `id` (UUID, PK), `user_id` (UUID, FK to `users.id`), `title`, `description`, `created_at`, `updated_at`.
    *   RLS: Users can only manage their own topics.
*   **`notes`**: Stores notes, linked to a user and a topic.
    *   Fields: `id` (UUID, PK), `user_id` (UUID, FK to `users.id`), `topic_id` (UUID, FK to `topics.id`), `title`, `content`, `created_at`, `updated_at`.
    *   RLS: Users can only manage their own notes.
*   **`flashcards`**: Stores flashcards, linked to a user and a topic.
    *   Fields: `id` (UUID, PK), `user_id` (UUID, FK to `users.id`), `topic_id` (UUID, FK to `topics.id`), `question`, `answer`, `created_at`, `updated_at`.
    *   RLS: Users can only manage their own flashcards.
*   **`quizzes`**: Stores quizzes, linked to a user and a topic.
    *   Fields: `id` (UUID, PK), `user_id` (UUID, FK to `users.id`), `topic_id` (UUID, FK to `topics.id`), `title`, `quiz_type` (`manual` | `ai_generated`), `questions` (JSONB), `created_at`, `updated_at`.
    *   RLS: Users can only manage their own quizzes.
*   **`quiz_results`**: Stores results of quizzes taken by users.
    *   Fields: `id` (UUID, PK), `user_id` (UUID, FK to `users.id`), `quiz_id` (UUID, FK to `quizzes.id`), `score`, `total_questions`, `answers` (JSONB), `created_at`.
    *   RLS: Users can only insert/view their own results.

All tables use `gen_random_uuid()` for primary keys and have `updated_at` managed by triggers. Foreign keys are indexed for performance.

---

## API Specifications (Sample: Notes API)

StudyFlow uses Next.js API Routes for backend logic. All API calls are protected by Supabase authentication and enforce RLS.

### Notes API

The Notes API allows users to manage their study notes. The handlers for these routes are located in <mcfile name="route.ts" path="src/app/api/notes/route.ts"></mcfile> and <mcfile name="route.ts" path="src/app/api/notes/[id]/route.ts"></mcfile>.

#### `GET /api/notes`
*   **Description**: Retrieves all notes for the authenticated user.
*   **Method**: `GET`
*   **Authentication**: Required (Supabase session)
*   **Response**: `200 OK` with an array of note objects, or `401 Unauthorized` if no session.
    ```json
    [
      {
        "id": "uuid-1",
        "user_id": "user-uuid",
        "topic_id": "topic-uuid",
        "title": "Note Title 1",
        "content": "Content of note 1",
        "created_at": "2023-01-01T12:00:00Z",
        "updated_at": "2023-01-01T12:00:00Z"
      }
    ]
    ```

#### `POST /api/notes`
*   **Description**: Creates a new note for the authenticated user.
*   **Method**: `POST`
*   **Authentication**: Required (Supabase session)
*   **Request Body**:
    ```json
    {
      "topic_id": "topic-uuid",
      "title": "New Note Title",
      "content": "New note content"
    }
    ```
*   **Response**: `201 Created` with the newly created note object, or `401 Unauthorized`.
    ```json
    {
      "id": "new-uuid",
      "user_id": "user-uuid",
      "topic_id": "topic-uuid",
      "title": "New Note Title",
      "content": "New note content",
      "created_at": "2023-01-02T10:00:00Z",
      "updated_at": "2023-01-02T10:00:00Z"
    }
    ```

#### `GET /api/notes/[id]`
*   **Description**: Retrieves a single note by its ID for the authenticated user.
*   **Method**: `GET`
*   **Authentication**: Required (Supabase session)
*   **Path Parameters**: `id` (UUID of the note)
*   **Response**: `200 OK` with the note object, `404 Not Found` if the note doesn't exist or doesn't belong to the user, or `401 Unauthorized`.
    ```json
    {
      "id": "uuid-1",
      "user_id": "user-uuid",
      "topic_id": "topic-uuid",
      "title": "Note Title 1",
      "content": "Content of note 1",
      "created_at": "2023-01-01T12:00:00Z",
      "updated_at": "2023-01-01T12:00:00Z"
    }
    ```

#### `PUT /api/notes/[id]`
*   **Description**: Updates an existing note by its ID for the authenticated user.
*   **Method**: `PUT`
*   **Authentication**: Required (Supabase session)
*   **Path Parameters**: `id` (UUID of the note)
*   **Request Body**:
    ```json
    {
      "title": "Updated Note Title",
      "content": "Updated note content"
    }
    ```
*   **Response**: `200 OK` with the updated note object, `404 Not Found`, `403 Forbidden` (if trying to update another user's note), or `401 Unauthorized`.
    ```json
    {
      "id": "uuid-1",
      "user_id": "user-uuid",
      "topic_id": "topic-uuid",
      "title": "Updated Note Title",
      "content": "Updated note content",
      "created_at": "2023-01-01T12:00:00Z",
      "updated_at": "2023-01-02T15:30:00Z"
    }
    ```

#### `DELETE /api/notes/[id]`
*   **Description**: Deletes a note by its ID for the authenticated user.
*   **Method**: `DELETE`
*   **Authentication**: Required (Supabase session)
*   **Path Parameters**: `id` (UUID of the note)
*   **Response**: `204 No Content` on successful deletion, `404 Not Found`, `403 Forbidden`, or `401 Unauthorized`.

---

## Features Implemented (MVP)

* Notes: create, list, view, edit, delete
* Topics: create, list, view, edit, delete (for organizing notes)
* Supabase integration for database + API routes
* AI-assisted workflows for scaffolding code, tests, and documentation

---

## AI Integration Strategy

### 1. Code or Feature Generation

* Scaffolded pages like `/study-plans`, `/study-plans/[id]`, and `/study-plans/new`.
* Generated reusable components (cards, forms, modals).
* Used AI for Tailwind utility class suggestions and layout structures.

### 2. Testing Support

* Generated Jest test stubs for API routes and React components.
* Generated Playwright end-to-end tests for core flows.
* Example prompt: *“Write a Jest test for the POST /api/study-plans route to ensure it inserts into Supabase correctly.”*

### 3. Schema-Aware/API-Aware Generation

* Provided Supabase schema for type-safe queries.
* Example prompt: *“Generate a TypeScript fetcher for GET /api/study-plans that returns StudyPlan[] with typed fields.”*

### 4. In-Editor / PR Review Tooling

* **CodeRabbit** used for inline reviews, refactor suggestions, PR summaries, and diff explanations.

### 5. Prompting Strategy

* *“Generate a TypeScript component for listing study plans. It should call /api/study-plans and render each plan as a card with title, description, and progress. Refer to the project's API documentation in api_specs.md for the expected response shape.”*
* *“Generate integration tests for study plan API routes: POST /api/study-plans should create a new plan in Supabase.”*

### 6. Documentation with AI

* AI-generated **docstrings** for API routes and utility functions.
* Auto-generated **README usage examples** as features evolved.
* AI summaries of commits and PRs for easier project tracking.

---

## Roadmap (MVP Scope)

* [x] Notes: Create, list, view, edit, delete
* [x] Topics: Create, list, view, edit, delete (for organizing notes)
* [ ] Authentication: Supabase Auth
* [ ] Shared layout with navigation

### Future Improvements

* AI-generated study schedules
* Personalized learning recommendations
* Performance analytics & streak tracking
* Flashcards: Basic CRUD
* Quizzes: Basic CRUD

---

## Deployment

The app is deployed to Vercel: [your-link.vercel.app](https://studyflow-a.vercel.app)