'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';

// Define schema
const registerSchema = z.object({
    email: z.string().email('Please enter a valid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
    confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters long.')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setFieldErrors({});
        setLoading(true);

        // Validate inputs
        const result = registerSchema.safeParse({ email, password, confirmPassword });
        if (!result.success) {
            const errors: Partial<Record<keyof RegisterFormData, string>> = {};
            result.error.issues.forEach((err) => {
                const field = err.path[0] as keyof RegisterFormData;
                errors[field] = err.message;
            });
            setFieldErrors(errors);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/auth/register', { email, password });
            if (response.status !== 201) {
                setError('Registration failed.');
                setLoading(false);
                return;
            }
            const res = await response.data;
            console.log("res:",res);
            setMessage('Registration successful! Please check your email to confirm your account.');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
                </div>
                <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <p className="text-center text-red-500 text-sm min-h-4">{fieldErrors.confirmPassword && fieldErrors.confirmPassword}</p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
                    Register
                </Button>
            </form>
            <div className='text-center'>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {message && <p className="text-green-400 text-sm font-bold">{message}</p>}
            </div>
        </div>
    );
}