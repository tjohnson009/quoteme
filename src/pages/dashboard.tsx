import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Quote, getQuotes, deleteQuote } from '@/services/quotes';
import QuoteCard from '@/components/QuoteCard'
import NewQuoteForm from '@/components/NewQuoteForm';

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
    const token = localStorage.getItem('token'); // ← use a better method later, good for MVP
    if (!token) {
      router.push('/');
    } else {
      const fetchQuotes = async () =>  {
        try {
          setAuthorized(true);
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
  }, [router]);
  
  if (loading) return <p>Loading...</p>;
  if (!authorized) return null;
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : ''; 

  return ( 
    <>
    <main className="mx-auto min-h-screen max-w-287.5 flex flex-col gap-4 flex-1 justify-start">
      { loading && <div className=""><p>Loading your quotes!</p></div>}
      { error && <p className="error">There was a problem when loading your quotes: {error}</p> }
      { !loading && !error && quotes.length === 0 && <p className="my-2 w-full mx-auto text-sm text-center text-gray-600">You do not have any quotes saved yet {user ? user.email : 'Guest'}. Start saving quotes now to see them here!</p> }
      <NewQuoteForm onQuoteCreated={(newQuote) => {
        setQuotes(prev => [newQuote, ...prev])
      }} />
      <section className="grid grid-cols-2 gap-4 pb-4">
      { quotes.map(quote => (
        <QuoteCard 
        key={quote.id} 
        quote={quote} 
        onDelete={() => {
          handleDelete(quote.id);
        }}
        />
      ))} 
      </section>
          </main>
    </>
  );
}
