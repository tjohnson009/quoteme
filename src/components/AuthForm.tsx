import React, { useState, FormEvent } from 'react';
import Button from './Button';

interface AuthFormProps {
    onLogin: (email: string, password: string) => void, 
    onSignup: (email: string, password: string) => void;
    submitLabel?: string;
    linkText?: string;
    className?: string
}

const AuthForm: React.FC<AuthFormProps> = ({
    onLogin,
    onSignup,
    className
}) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [isLoading, setIsLoading] = useState(false); 
const [error, setError] = useState<string | null>(null);
const [mode, setMode] = useState<'login' | 'signup'>('login'); 

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        if (mode === 'login') {
            onLogin(email, password);
        } else {
            onSignup(email, password);
        }
    } catch(error) {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
        setIsLoading(false);
    }
};

const inputClasses = "w-full px-3 py-2 rounded-lg bg-background border border-border text-base text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent-2 focus:ring-2 focus:ring-accent-2/20 transition";
const labelClasses = "block text-sm font-medium text-foreground-secondary mb-1";

return (
   <form onSubmit={handleSubmit} className={className ? className : ""}>
        <h2 className="text-xl font-bold text-center text-foreground">
            {mode === 'login' ? 'Log Into QuoteMe' : 'Create An Account'}
        </h2>

        {error && (
            <p className="text-sm text-error bg-error/10 rounded-md px-3 py-2">{error}</p>
        )}

        <div>
            <label htmlFor="email" className={labelClasses}>Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
                required
                disabled={isLoading}
                placeholder='you@example.com'
                className={inputClasses}
            />
        </div>

        <div>
            <label htmlFor="password" className={labelClasses}>Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={isLoading}
                placeholder='••••••••'
                className={inputClasses}
            />
        </div>

        <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
        >
            {isLoading ? 'Loading...' : (mode === 'login' ? 'Log In' : 'Sign Up')}
        </Button>

        <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            type='button'
            className="text-sm text-accent-2 hover:brightness-110 cursor-pointer transition text-center"
        >
            {mode === 'login'
                ? "Don't have an account? Sign up"
                : "Already have an account? Log in"}
        </button>
    </form>
)
}; 

export default AuthForm;