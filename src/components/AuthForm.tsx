import React, { useState, FormEvent } from 'react';
// import { supabase } from '@/lib/supabaseClient'; 
// import { useRouter } from 'next/router'; 

interface AuthFormProps {
    onSubmit: (email: string, password: string) => Promise<void>;
    isLoading?: boolean;
    error?: string | null;
    submitLabel?: string;
    authType: 'login' | 'signup';
    linkText?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
    onSubmit,
    isLoading = false,
    error,
    // submitLabel = 'Sign In',
    authType,
    // linkText, 
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-[320px] mx-auto">
            <h2>{authType === 'login' ? 'Log In To QuoteMe' : 'Create New Account'}</h2>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <div className="mb-3">
                <label className="block">
                    Email
                    <input
                        type="email"
                        name="email"
                        value={email}
                        autoComplete="email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        disabled={isLoading} 
                        className="w-full p-2 mt-1 border rounded"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block">
                    Password
                    <input
                        type="password"
                        name="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="w-full p-2 mt-1 border rounded"
                    />
                </label>
            </div>
            <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full py-2.5 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {isLoading ? 'Loading...' : 'Submit'}
            </button>
        </form>
    );
};

export default AuthForm;