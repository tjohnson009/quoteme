import { useState } from 'react';
import AuthForm from '@/components/AuthForm';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router'; 
import { login } from '@/services/auth'; //proxy 

export default function LoginPage() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState<string | null>(null); 
  const router = useRouter(); 

  const handleLogin = async(email: string, password: string) => {
    // e.preventDefault(); 
    const { error } = await supabase.auth.signInWithPassword({ email, password }); 
    setError(error?.message || null); 
    setLoading(true); 

    try {
      await login(email, password); // <== this hits our Next.js proxy API route and returns the session/user data
      router.push('/dashboard');
    } catch(err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthForm
    onSubmit={handleLogin}
    isLoading={false} // You can manage loading state if needed
    error={error}
    authType="login"
    linkText="Don't have an account? Sign Up"
    />
  )
}

