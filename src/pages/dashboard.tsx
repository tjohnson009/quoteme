import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {logout} from '@/services/auth'; // proxy logout function
import { Quote, getQuotes, deleteQuote } from '@/services/quotes';
import QuoteCard from '@/components/QuoteCard'
import Button from '@/components/Button';
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer';

export default function Dashboard() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null) 
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    // delete the quote from the database
    try {
      await deleteQuote(id);
      setQuotes((prevQuotes) => { return prevQuotes.filter(quote => quote.id !== id)})
      // if successful, then renove the quote from the UI
    } catch(err) {
      setError("Failed to delete quote."); 
      console.error("Something went wrong while deleting your quote:", `${err}`); 
    }
  }

  useEffect(() => { 
    const token = localStorage.getItem('token'); // ← use a better method later, for now quick
    if (!token) {
      router.push('/');
    } else {
      const fetchQuotes = async () =>  {
        try {
          setAuthorized(true);
          setLoading(false);
          const data = await getQuotes();
          setQuotes(data)
        } catch (err) {
          setError("Failed to load quotes from database.");
          console.error(err)
        } finally {
          setLoading(false)
        }
      };

      fetchQuotes()
    }
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (!authorized) return null;
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : ''; 

  return ( 
    <>
    <main className="min-h-screen">

      { loading && <p>Loading your quotes!</p> }
      { error && <p className="error">There was a problem when loading your quotes: {error}</p> }
      { !loading && !error && quotes.length === 0 && <p className="my-2 w-full mx-auto text-sm text-center text-gray-600">You do not have any quotes saved yet {user ? user.email : 'Guest'}. Start saving quotes now to see them here!</p> }
      { quotes.map(quote => (
        <QuoteCard 
          key={quote.id} 
          quote={quote} 
          onDelete={() => {
            handleDelete(quote.id);
          }}
           />
      ))} 
          </main>
    </>
  );
}
