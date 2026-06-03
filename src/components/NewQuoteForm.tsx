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
            if (text !== '') {
                setSubmitting(true); 
                const quote = await createQuote(text, author, tags.split(',').map(t => t.trim()), notes)
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
        <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <input type="text" id="text" value={text} onChange={(e) => setText(e.target.value)} required/>
            <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)}/>
            <input type="text" id="tags"  value={tags} onChange={(e) => setTags(e.target.value)}/>
            <input type="text" id="notes"  value={notes} onChange={(e) => setNotes(e.target.value)}/>
            <button type="submit" disabled={submitting}>Save Quote</button>
    </form>
    )
}