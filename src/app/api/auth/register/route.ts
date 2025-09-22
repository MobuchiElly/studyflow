import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `http://localhost:3000/auth/verify-email?email=${encodeURIComponent(email)}`
    }
  });
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
console.log("successful");
  return NextResponse.json({ message: 'Registration successful! Please check your email to confirm your account.' }, { status: 201 });
}