import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {logout} from '@/services/auth'; // proxy logout function
import { log } from 'console';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => { 
    const token = localStorage.getItem('token'); // ← use a better method later, for now quick
    if (!token) {
      router.push('/');
    } else {
      setAuthorized(true);
      setLoading(false);
    }
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (!authorized) return null;
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : ''; 

  return ( 
    <>
    <main className="min-h-screen">
      <p className="my-2 w-full mx-auto text-sm text-center text-gray-600">You do not have any quotes saved {user ? user.email : 'Guest'}!</p>
    </main>
    </>
  );
}
