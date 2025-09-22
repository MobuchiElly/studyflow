## 1. StudyFlow Project Scope & Goals

StudyFlow is a learning productivity app that allows users to:

Language: English at all times
* Create and manage **notes**
* Build and review **flashcards**
* Take **quizzes** (manual or AI-assisted generation)
* Organize **study plans**
* Track **progress**

The project demonstrates intentional AI-assisted development while following clean architecture, best practices, and scalable design.

---

## 2. Folder Structure

```
/studyflow
  /src
    /app
      /api          → API routes (backend logic, Supabase integration)
      /auth         → Authentication pages
      /dashboard    → Protected user dashboard
      /notes        → Notes feature pages
      /quizzes      → Quiz feature pages
      /flashcards   → Flashcards feature pages
      /plans        → Study plans feature pages
    /components     → UI components (split by domain/feature)
      /shared       → Reusable shared components (buttons, modals, layouts)
    /lib            → Utilities, Supabase client, helper functions
    /hooks          → Custom React hooks
    /types          → TypeScript types and interfaces
    /styles         → Global styles (Tailwind config, CSS resets)
  /public           → Static assets (images, icons, logos)
  /tests            → Unit and integration tests
  /docs             → Documentation (architecture, AI usage, setup, API spec)
  README.md         → Project overview & usage
  project_rules.md  → Development rules (this file)
  reflection.md     → Reflection on AI-assisted development
```

---

## 3. Tech Stack

* **Framework:** Next.js 15 (App Router, RSC)
* **Language:** TypeScript
* **Database & Auth:** Supabase (Postgres + Auth, using `@supabase/ssr` for server-side authentication)
* **Data fetching:** Axios
* **Data and input validation:** Zod for forms
* **UI & Styling:** Tailwind CSS, Radix UI (if needed), Framer Motion for animations
* **Testing:** Jest + React Testing Library + Playwright for E2E
* **CI/CD:** GitHub Actions (build, lint, test, deploy)
* **Deployment:** Vercel

---

## 4. Development Workflow

* **Branching model:**

  * `main` → stable branch (production-ready)
  * `dev` → active development branch
  * `feature/*` → individual feature branches

* **Pull requests (PRs):**

  * All PRs require code review (can use AI assistant review first, then human check).
  * Small, focused PRs are preferred.

* **Commits:**

  * Follow [Conventional Commits](https://www.conventionalcommits.org/):

    * `feat:` → new feature
    * `fix:` → bug fix
    * `docs:` → documentation
    * `test:` → testing changes
    * `refactor:` → refactoring without feature changes
  * AI-assisted commits should be prefixed (e.g., `feat(ai):`).

---

## 5. Coding Standards

* **TypeScript** must be strictly typed (`strict` mode enabled).
* **Components** must be functional (React hooks only, no class components).
* **Separation of concerns:**

  * UI logic in components
  * Business logic in `/lib` or hooks
  * Database calls inside API routes only
* **Linting & Formatting:**

  * ESLint + Prettier enforced via CI.

---

## 6. Testing Strategy

* **Unit tests:** For functions, hooks, and isolated logic.
* **Integration tests:** For API routes and Supabase interactions.
* **E2E tests:** For user flows (login, creating notes, quizzes).
* **Coverage:** Aim for at least 70% coverage before deployment.

---

## 7. Performance Guidelines

* Use **React Server Components** where possible.
* Implement **lazy-loading** for large components/pages.
* Optimize images with Next.js `<Image />`.
* Use **Supabase row-level security (RLS)** for efficient and secure queries.
* Minimize network requests with proper caching.

---

## 8. Security Guidelines

* Supabase keys must be stored in **environment variables**.
* Protect API routes with **Supabase auth middleware**.
* Validate user inputs before DB operations.
* Enforce HTTPS in production.
* Sanitize all rendered user content.

---

## 9. AI Usage Guidelines

* **When to use AI:**

  * Scaffolding boilerplate (UI, APIs, tests)
  * Writing documentation and commit messages
  * Refactoring for clarity
  * Generating quiz questions from study content

* **When NOT to use AI:**

  * Finalizing critical security logic
  * Writing sensitive SQL policies without review

* **Documentation of AI contributions:**

  * Maintain `/docs/ai-usage.md` with examples of prompts and results.
  * Label AI-generated commits clearly (`feat(ai):`, `refactor(ai):`).

---

## 10. CI/CD Rules

* GitHub Actions must run on every push:

  * `lint` (ESLint + Prettier)
  * `test` (Jest + Playwright)
  * `build` (Next.js build)
* Only merge if all checks pass.
* Auto-deploy `main` to Vercel after checks pass.

---

## 11. Documentation

* **README.md:** Setup, features, usage, stack, AI notes.
* **reflection.md:** 500-word reflection on AI-assisted development.
* **docs/:**

  * `architecture.md` → System architecture diagram + explanation
  * `ai-usage.md` → AI prompts and results
  * `api-spec.md` → API documentation (notes, quizzes, flashcards, plans)

---

12. Database Schema & Rules

The project uses Supabase (Postgres + Auth) with Row Level Security (RLS) enabled.
Key database entities and rules:

Users

Extends auth.users with a public.users table.

Fields: id, email, display_name, avatar_url, timestamps.

Triggers keep users in sync with auth.users (on insert + email updates).

RLS: users can only read/update their own data.

Topics

Each user can create multiple study topics.

Fields: id, user_id, title, description, timestamps.

RLS: users can only manage their own topics.

Notes

Linked to both a user_id and a topic_id.

Fields: id, title, content, timestamps.

RLS: users can only manage their own notes.

Flashcards

Linked to user_id and topic_id.

Fields: id, question, answer, timestamps.

RLS: users can only manage their own flashcards.

Quizzes

Linked to user_id and topic_id.

Fields: id, title, quiz_type (manual | ai_generated), questions (jsonb), timestamps.

RLS: users can only manage their own quizzes.

Quiz Results

Linked to user_id and quiz_id.

Fields: id, score, total_questions, answers (jsonb), created_at.

RLS: users can only insert/view their own results.

Shared Features

All tables use uuid primary keys (gen_random_uuid()).

updated_at managed by triggers.

Indexes exist on foreign keys (user_id, topic_id, etc.) for performance.

Security Rules:

Every table has RLS enabled.

Policies ensure users can only access their own data.

All API calls must pass through Supabase Auth.
---