# StudyFlow

An AI-assisted **study planning app** that helps learners create, manage, and track their study schedules.  
This is an **MVP** built as part of the ALX Capstone project: *Planning with AI Intentionally*.

---

##  Project Title & Description

**StudyFlow – AI-Powered Study Planner**

StudyFlow is a lightweight study planning app that enables learners to organize their goals, build study schedules, and monitor progress.  

### Who it's for
- Students preparing for exams
- Professionals studying for certifications
- Self-learners building personal knowledge systems

### Why it matters
Consistency is the hardest part of learning. StudyFlow provides a simple way to plan studies and track progress, while setting the foundation for future AI features like optimized schedules and personalized learning suggestions.

---

##  Tech Stack
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

##  AI Integration Strategy

### 1. Code or Feature Generation
- Scaffold pages like `/study-plans`, `/study-plans/[id]`, and `/study-plans/new`.
- Generate reusable components (cards, forms, modals).
- Use AI for Tailwind utility class suggestions and layout structures.

### 2. Testing Support
- Generate Jest test stubs for API routes and React components.
- Generate Playwright end-to-end tests for core flows.
- Example prompt: *“Write a Jest test for the POST /api/study-plans route to ensure it inserts into Supabase correctly.”*

### 3. Schema-Aware/API-Aware Generation
- Provide Supabase schema for type-safe queries.
- Example prompt: *“Generate a TypeScript fetcher for GET /api/study-plans that returns StudyPlan[] with typed fields.”*

### 4. In-Editor / PR Review Tooling
- **CodeRabbit** will be used for:
  - Inline code reviews
  - Suggesting refactors
  - PR summaries
  - Explaining diffs during PRs

### 5. Prompting Strategy
- *“Generate a TypeScript component for listing study plans. It should call /api/study-plans and render each plan as a card with title, description, and progress. Refer to the project's API documentation for the expected response shape.”*
- *“Generate integration tests for study plan API routes: POST /api/study-plans should create a new plan in Supabase.”*

### 6. Documentation with AI
- Use AI to generate and maintain **docstrings** for API routes and utility functions.  
- Auto-generate **README usage examples** as features evolve.  
- Summarize commits and PRs for easier project tracking.  

---

##  Roadmap (MVP Scope)

- [ ] Study Plans: Create, list, view details
- [ ] Flashcards: Basic CRUD
- [ ] Quizzes: Basic CRUD
- [ ] Notes: Basic CRUD
- [ ] Authentication: Supabase Auth
- [ ] Shared layout with navigation

Future improvements (post-MVP):  
- AI-generated study schedules  
- Personalized learning recommendations  
- Performance analytics & streak tracking  

---