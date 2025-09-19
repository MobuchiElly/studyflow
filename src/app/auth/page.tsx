'use client';

import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { Button } from '@/components/ui/button';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Authentication</h1>
      <div className="w-full max-w-md space-y-4">
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <Button
          variant="link"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full"
        >
          {
            isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </Button>
      </div>
    </div>
  );
}