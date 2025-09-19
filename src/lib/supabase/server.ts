import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  // IMPORTANT: DO NOT REMOVE auth.getUser()

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `cookies().set()` method can only be called in a Server Component or Route Handler.
            // If you're calling this from a Client Component, it won't work.
            // For more details: https://nextjs.org/docs/app/api-reference/functions/cookies#cookies
          }
        }
    }
    }
  );
}