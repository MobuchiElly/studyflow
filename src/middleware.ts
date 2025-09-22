import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from './lib/supabase/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const cookieStore = cookies();

  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      // Redirect unauthenticated users to the login page
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/auth';
      redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname); // Optional: add a redirect param
      return NextResponse.redirect(redirectUrl);
    }
  }

  // If the user is logged in and tries to access /auth/login or /auth/signup, redirect to dashboard
  if (session && req.nextUrl.pathname === '/auth') {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/dashboard/notes';
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth'
  ],
};