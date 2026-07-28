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
        } catch (err) {
            setError("Failed to create quote.");
            console.error(error, "Something went wrong when trying to create that quote. Try again in a minute...");
            console.error(err)
        } finally {
            setSubmitting(false);
        }
    }

    const inputClasses = "w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent-1 focus:ring-2 focus:ring-accent-1/20 transition";
    const labelClasses = "block text-sm font-medium text-foreground-secondary mb-1";

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-foreground">Add a new quote</h2>

            {error && (
                <p className="text-sm text-error bg-error/10 rounded-md px-3 py-2">{error}</p>
            )}

            <div>
                <label htmlFor="text" className={labelClasses}>Quote</label>
                <textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    rows={3}
                    placeholder="What did they say?"
                    className={inputClasses}
                />
            </div>

            <div>
                <label htmlFor="author" className={labelClasses}>Author</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Who said it?"
                    className={inputClasses}
                />
            </div>

            <div>
                <label htmlFor="tags" className={labelClasses}>Tags</label>
                <input
                    type="text"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="wisdom, motivation, humor"
                    className={inputClasses}
                />
                <p className="text-xs text-muted-foreground mt-1">Separate tags with commas</p>
            </div>

            <div>
                <label htmlFor="notes" className={labelClasses}>Notes</label>
                <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Any extra notes about this quote"
                    className={inputClasses}
                />
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="mt-2 px-4 py-2 rounded-lg bg-accent-1 text-on-accent font-medium hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-1/40 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                {submitting ? "Saving..." : "Save Quote"}
            </button>
        </form>
    )
}