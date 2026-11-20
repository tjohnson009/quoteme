import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Quote, getQuotes, deleteQuote } from '@/services/quotes';
import QuoteCard from '@/components/QuoteCard'
import QuoteForm from '@/components/QuoteForm';
import Modal from '@/components/Modal';
import ConfirmDelete from '@/components/ConfirmDelete';
import { logout } from '@/services/auth';

export default function Dashboard() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const [authorized, setAuthorized] = useState(false);
  const [isAddQuoteModalOpen, setIsAddQuoteModalOpen] = useState<boolean>(false)
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null)
  const [deletingQuote, setDeletingQuote] = useState<Quote | null>(null)
  const router = useRouter();

  const handleDelete = async (id: number) => {
    // delete the quote from the database
    try {
      await deleteQuote(id);
      setQuotes((prevQuotes) => { return prevQuotes.filter(quote => quote.id !== id) })
      // if successful, then renove the quote from the UI
    } catch (err) {
      setError("Failed to delete quote.");
      console.error("Something went wrong while deleting your quote:", `${err}`);
    }
  }

  const handleAddQuoteClick = () => {
    setIsAddQuoteModalOpen(true)

  }

  useEffect(() => {
    const token = localStorage.getItem('token'); // ← use a better method later, good for MVP
    if (!token) {
      router.push('/');
    } else {
      const fetchQuotes = async () => {
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

  // gray placeholder cards while the quotes load
  if (loading) return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10 flex-1">
      <div className="h-10 w-64 mb-8 rounded-lg bg-foreground/5 animate-pulse"></div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-5">
        {['h-44', 'h-56', 'h-40', 'h-52'].map((height) => (
          <div key={height} className={`${height} rounded-2xl bg-foreground/5 animate-pulse`}></div>
        ))}
      </section>
    </main>
  );
  if (!authorized) return null;
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : '';

  const addQuoteButtonClasses = "flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent-1 text-on-accent font-medium shadow-sm cursor-pointer hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 transition";
  const plusIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10 flex flex-col gap-6 flex-1 justify-start">
        {isAddQuoteModalOpen && (
          <Modal onClose={() => setIsAddQuoteModalOpen(false)} label="Add a new quote">
            <QuoteForm
              onSave={(newQuote) => {
                setQuotes((prev) => [newQuote, ...prev]);
                setIsAddQuoteModalOpen(false);
              }}
            />
          </Modal>
        )}
        {editingQuote && (
          <Modal onClose={() => setEditingQuote(null)} label="Edit quote">
            <QuoteForm
              initialQuote={editingQuote}
              onSave={(updated) => {
                setQuotes((prev) => prev.map((q) => q.id === updated.id ? updated : q));
                setEditingQuote(null);
              }}
            />
          </Modal>
        )}
        {/* ask before deleting, the quote is only removed after "Delete" is clicked */}
        {deletingQuote && (
          <Modal onClose={() => setDeletingQuote(null)} label="Delete this quote?">
            <ConfirmDelete
              quote={deletingQuote}
              onCancel={() => setDeletingQuote(null)}
              onConfirm={() => {
                handleDelete(deletingQuote.id);
                setDeletingQuote(null);
              }}
            />
          </Modal>
        )}
        {/* demo accounts are temporary, so let the visitor know */}
        {user && user.is_anonymous && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-accent-2/10 border border-accent-2/25 rounded-xl px-4 py-3 text-sm text-foreground">
            <p>You&apos;re trying QuoteMe with sample quotes. This copy is just yours and is cleared after 24 hours.</p>
            <button onClick={() => logout('/?mode=signup')} type="button" className="shrink-0 text-left font-medium text-foreground underline decoration-accent-2 decoration-2 underline-offset-4 cursor-pointer hover:decoration-4 transition">Create an account</button>
          </div>
        )}
        {error && <p className="text-sm text-error bg-error/10 rounded-md px-3 py-2">There was a problem when loading your quotes: {error}</p>}

        {/* title and count on the left, Add Quote on the right (stacked on phones) */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-medium tracking-tight text-foreground">Your Saved Quotes</h1>
            {!error && <p className="mt-1 text-sm text-muted-foreground">{quotes.length} {quotes.length === 1 ? 'quote' : 'quotes'}</p>}
          </div>
          {(quotes.length > 0 || error) && <button onClick={handleAddQuoteClick} className={addQuoteButtonClasses}>{plusIcon}Add Quote</button>}
        </div>

        {!loading && !error && quotes.length === 0 && (
          <div className="flex flex-col items-center text-center gap-4 py-16">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-accent-2" aria-hidden="true">
              <path d="M4 18v-5.2c0-3.6 1.6-6.1 4.9-7.6l1 1.7C8 7.9 7 9.2 6.9 11H9v7H4zm10 0v-5.2c0-3.6 1.6-6.1 4.9-7.6l1 1.7C18 7.9 17 9.2 16.9 11H19v7h-5z" />
            </svg>
            <p className="max-w-sm text-muted-foreground">You do not have any quotes saved yet {user && !user.is_anonymous ? user.email : 'Guest'}. Start saving quotes now to see them here!</p>
            <button onClick={handleAddQuoteClick} className={addQuoteButtonClasses}>{plusIcon}Add Quote</button>
          </div>
        )}

        {/* a grid (not masonry columns), so opening notes never moves a card to another column */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-5">
          {quotes.map(quote => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              onEdit={() => setEditingQuote(quote)}
              onDelete={() => {
                setDeletingQuote(quote);
              }}
            />
          ))}
        </section>
      </main>
    </>
  );
}
