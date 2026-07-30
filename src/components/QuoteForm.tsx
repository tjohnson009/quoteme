import { useState } from "react";
import { Quote, createQuote, editQuote } from "@/services/quotes";

interface QuoteFormProps {
    initialQuote?: Quote;
    onSave: (quote: Quote) => void;
}

export default function QuoteForm({ initialQuote, onSave }: QuoteFormProps) {
    const isEditing = Boolean(initialQuote);

    const [text, setText] = useState(initialQuote?.text ?? '');
    const [author, setAuthor] = useState(initialQuote?.author ?? '');
    const [tags, setTags] = useState(initialQuote?.tags?.join(', ') ?? '');
    const [notes, setNotes] = useState(initialQuote?.notes ?? '');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() === '') {
            setError("Quote text is required.");
            return;
        }
        try {
            setSubmitting(true);
            setError('');
            const parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);

            if (isEditing && initialQuote) {
                const res = await editQuote(initialQuote.id, {
                    text: text.trim(),
                    author,
                    tags: parsedTags,
                    notes,
                });
                onSave(res.updatedData[0]);
            } else {
                const quote = await createQuote(text.trim(), author, parsedTags, notes);
                onSave(quote);
                setText('');
                setAuthor('');
                setTags('');
                setNotes('');
            }
        } catch (err) {
            setError(isEditing ? "Failed to save changes." : "Failed to create quote.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    const inputClasses = "w-full px-3 py-2 rounded-lg bg-background border border-border text-base text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent-1 focus:ring-2 focus:ring-accent-1/20 transition";
    const labelClasses = "block text-sm font-medium text-foreground-secondary mb-1";

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-foreground">
                {isEditing ? "Edit quote" : "Add a new quote"}
            </h2>

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
                {submitting ? "Saving..." : isEditing ? "Save changes" : "Save Quote"}
            </button>
        </form>
    )
}
