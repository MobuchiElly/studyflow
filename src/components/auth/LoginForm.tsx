'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from "axios";
import { z } from 'zod';
import { useRouter } from 'next/navigation';

// Define the Zod schema for login form validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

/**
 * LoginForm component for user authentication.
 * Handles user input for email and password, validates it using Zod,
 * and communicates with the backend API for login.
 * Displays loading states, success messages, and error messages.
 *
 * @returns {JSX.Element} The login form component.
 */
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setErrors([]); // Clear previous errors

    try {
      // Validate input using Zod
      const validatedData = loginSchema.parse({ email, password });

      // Make API call to your login endpoint
      const response = await axios.post('/api/auth/login', validatedData);
      
      if (response.status === 200) {
        setMessage('Login successful! Redirecting...');
        router.push('/dashboard/notes');
      } else {
        setMessage(response.data.message || 'Login failed.');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.issues); // Set Zod validation errors
      }
      if (axios.isAxiosError(error) && error.response) {
        console.log("err:", error)
        setMessage(error.response.data.message || 'An error occurred during login.');
      } else {
        setMessage('An unexpected error occurred.');
      }
    } finally {
      
    }
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
          {errors.find(err => err.path[0] === 'email') && (
            <p className="text-red-500 text-sm mt-1">
              {errors.find(err => err.path[0] === 'email')?.message}
            </p>
          )}
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
          {errors.find(err => err.path[0] === 'password') && (
            <p className="text-red-500 text-sm mt-1">
              {errors.find(err => err.path[0] === 'password')?.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        {message && <p className="text-center text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;