# Reflection on StudyFlow Capstone Development

## Introduction
For my capstone project, I built **StudyFlow**, a study-focused web app where users can create, edit, and organize notes securely. The app provides note-taking and topic management. I developed the app with **Next.js (App Router), Supabase, TypeScript, and Tailwind CSS**. AI was integrated throughout the process, acting as a coding partner, providing scaffolding, suggesting solutions, and generating tests.  

This reflection explores how AI supported my workflow, where it introduced friction, and what I learned about prompting, reviewing, and balancing AI assistance with independent development.

---

## How AI Supported My Development
AI was especially useful for:
- **Scaffolding:** It quickly generated boilerplate API route handlers and Next.js middleware for authentication and redirects (e.g., ensuring unauthenticated users get routed to `/auth` and logged-in users to `/dashboard`).
- **Testing:** AI helped me design unit and integration test structures for API routes. It scaffolded Jest and Supertest setups, wrote mock Supabase clients, and provided reusable test helpers.
- **Iteration:** When writing tests for `/api/notes/[id]`, AI helped restructure calls to properly handle `{ params }` objects in Next.js App Router handlers.  
- **Documentation and Commit Support:** It suggested docstrings for route handlers and clear commit message formats (`feat:`, `fix:`, `test:`), improving consistency in my Git history.

---

## Challenges and Limitations
The biggest limitation was **outdated or deprecated code suggestions**. AI repeatedly suggested Supabase methods or approaches that were no longer supported:
- It suggested client instantiations and helper functions from older Supabase SDKs.
- I had to discard AI’s attempts and instead consult the official **Supabase SSR documentation** to correctly implement `createClient` with `@supabase/ssr`.

This pattern taught me that **AI often hallucinates “plausible code”**, but not always *correct or up-to-date code*. For Supabase in particular, relying blindly on AI wasted time until I cross-checked against official docs.

Another issue was **mocking**: AI initially provided mock Supabase clients that weren’t chainable (e.g., `.from().select().eq().single()`). These had to be refactored manually for the tests to run correctly.

---

## What Worked Well
Despite challenges, several workflows were accelerated:
- AI made writing **tests** less overwhelming by scaffolding repetitive setup code.
- AI-powered **reviews** (asking it to spot mistakes in test structures or route handlers) helped me catch inconsistencies early.
- The middleware redirect logic was mostly correct on the first try when AI scaffolded it.
- AI was also very effective for **refining prose** in documentation, like improving the clarity of README sections and comments.

---

## What I Learned About Prompting and Reviewing
This project deepened my understanding of **how to prompt effectively**:
- Being precise about **framework versions** mattered (“Next.js 15 App Router with Supabase SSR” worked better than just “Next.js with Supabase”).
- Iterative prompting worked best: ask AI to scaffold → test AI’s suggestion → refine with specifics.
- I learned that **reviewing AI output is not optional**. For example, outdated Supabase snippets reminded me to always double-check against current docs before trusting AI output.

I also discovered that AI is most useful for:
1. **Scaffolding repetitive patterns** (tests, boilerplate).
2. **Explaining errors** in natural language.
3. **Suggesting refactors** to improve readability or consistency.

It is least useful for **framework-specific, rapidly evolving APIs** like Supabase SSR, where the documentation is a more reliable source.

---

## Final Thoughts
Overall, AI acted like a pair programmer. It was helpful with drafts and ideas, but needing oversight. It accelerated scaffolding and documentation, reduced the cognitive load of repetitive coding, and allowed me to focus on design and integration.  

At the same time, its tendency to return deprecated functions highlighted a key takeaway: **AI can speed you up, but not replace your responsibility as a developer to validate and learn.**  

If I were to redo this project, I would:
- Lean on AI more for test scaffolding and documentation.
- Depend less on AI for library-specific integrations and instead consult docs first.
- Treat AI outputs as **first drafts, never final answers**.  

Through StudyFlow, I’ve grown more confident in integrating AI into my workflow while maintaining critical thinking. This balance between acceleration and oversight is the most valuable lesson I take away from this capstone.

---