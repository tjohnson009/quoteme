import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // ← use a better method later, for now quick
    if (!token) {
      router.push('/login');
    } else {
      setAuthorized(true);
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!authorized) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">Welcome to QuoteMe 🎉</h1>
      <p className="mt-2 text-gray-600">You are successfully signed in.</p>
    </main>
  );
}
