import { useState } from "react";
import { Quote, createQuote } from "@/services/quotes";

interface NewQuoteFormProps {
    onQuoteCreated: (quote: Quote) => void;
}

export default function NewQuoteForm(props: NewQuoteFormProps) {
    const [text, setText] = useState(''); 
    const [author, setAuthor] = useState(''); 
    const [tags, setTags] = useState(''); 
    const [notes, setNotes] = useState(''); 
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (text.trim() !== '') {
                setSubmitting(true); 
                const quote = await createQuote(text.trim(), author, tags.split(',').map(t => t.trim()), notes)
                props.onQuoteCreated(quote)
                setText('')
                setAuthor('')
                setTags('')
                setNotes('')
            } else {
                console.error("Text must be included in the quote to save it!");
            }
        } catch(err) {
            setError("Failed to create quote."); 
            console.error(error, "Something went wrong when trying to create that quote. Try again in a minute...");
            console.error(err)
        } finally {
            setSubmitting(false); 
        }
    }

    return (
        <form onSubmit={handleSubmit} className="border border-amber-400 flex flex-col min-h-1/2">
            {error && <p className="text-red-500">{error}</p>}
            <label htmlFor="text">Quote: </label>
            <input type="text" id="text" value={text} onChange={(e) => setText(e.target.value)} required/>

            <label htmlFor="author">Author: </label>
            <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)}/>

            <label htmlFor="tags">Tags (comma separated)</label>
            <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)}/>

            <label htmlFor="notes">Notes</label>
            <input type="text" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)}/>
            <button type="submit" disabled={submitting}>Save Quote</button>
    </form>
    )
}