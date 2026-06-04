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

return (
   <form onSubmit={handleSubmit} className={className ? className : ""}>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <h2 className="text-xl font-bold mb-4 mx-auto">
                {mode === 'login' ? 'Log Into QuoteMe' : 'Create An Account'}</h2>
            <div className="mb-3">
                <label className="block">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        autoComplete="email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        disabled={isLoading} 
                        placeholder='Email'
                        className="w-full p-2 mt-1 border rounded"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block">
                    <input
                        type="password"
                        name="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        placeholder='Password'
                        className="w-full p-2 mt-1 border rounded"
                    />
                </label>
            </div>
            <Button
                type="submit" 
                disabled={isLoading} 
            >
                {isLoading ? 'Loading...' : 'Submit'}
            </Button>
            <Button 
                onClick={() => {
                  return mode === 'login' ? setMode('signup') : setMode('login') 
                }}
                type='button'
            >{mode === 'login'
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Log in"}
            </Button>
        </form>
)
}; 

export default AuthForm;