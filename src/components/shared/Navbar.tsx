'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabaseBrowserClient } from '@/lib/supabase/client';

export default function Navbar() {
  const [session, setSession] = useState<any>(null);
  const supabase = supabaseBrowserClient;
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          StudyFlow
        </Link>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link href="/dashboard/topics" className="hover:text-blue-300">
              Topics
            </Link>
          </li>
          <li>
            <Link href="/dashboard/notes" className="hover:text-blue-300">
              Notes
            </Link>
          </li>
          <li>
            {session ? (
              <Button onClick={handleSignOut} size="sm" className="text-white border-1 border-white hover:bg-blue-700 bg-transparent py-2">
                Sign Out
              </Button>
            ) : (
              <Button asChild size="sm" className="text-white border-1 border-white hover:bg- bg-transparent py-4">
                <Link href="/auth/login">Get Started</Link>
              </Button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}