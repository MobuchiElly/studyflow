'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Here we will integrate with Supabase for actual login
    // For now, let's just simulate a login
    console.log('Attempting to log in with:', { email, password });

    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        setMessage('Login successful!');
      } else {
        setMessage('Invalid credentials.');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        {message && <p className="text-center text-sm">{message}</p>}
      </form>
      <p className="text-center text-sm text-gray-500">
        Don't have an account? <a href="/auth/signup" className="text-blue-500 hover:underline">Sign Up</a>
      </p>
    </div>
  );
};

export default LoginForm;