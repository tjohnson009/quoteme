// import { useState } from 'react';
// import { supabase } from '@/lib/supabaseClient';

// export default function SignUpPage() {
//   const [email, setEmail] = useState(''); 
//   const [password, setPassword] = useState(''); 
//   const [error, setError] = useState<string | null>(null); 

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault(); 
//     const { error } = await supabase.auth.signInWithPassword({ email, password })
//     setError(error?.message || null)
//   }

//   return (
//     <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 p-4 border rounded">
//       <h2 className="text-2xl mb-4">Sign In</h2>
//       <input type="email" placeholder="Email" className="mb-2 w-full p-2 border" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" className="mb-2 w-full p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Sign In</button>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </form>
//   )
// }

import { useState } from 'react';
import { useRouter } from 'next/router';
import AuthForm from '@/components/AuthForm';
import { signup } from '@/services/auth';

export default function SignupPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (email: string, password: string) => {
    setError('');
    setLoading(true);

    try {
      await signup(email, password);
      router.push('/dashboard'); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred'); 
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50">
      <AuthForm
        onSubmit={handleSignup}
        isLoading={loading}
        error={error}
        submitLabel="Sign Up"
        authType="signup"
        linkText="Log In"
        // onToggleAuth={() => router.push('/login')}
      />
    </main>
  );
}
