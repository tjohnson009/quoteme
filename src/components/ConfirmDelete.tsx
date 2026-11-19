import { Quote } from "@/services/quotes";

interface ConfirmDeleteProps {
    quote: Quote;
    onCancel: () => void;
    onConfirm: () => void;
}

// shown inside a Modal so nobody loses a quote with one accidental click
export default function ConfirmDelete({ quote, onCancel, onConfirm }: ConfirmDeleteProps) {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-serif text-2xl font-medium text-foreground pr-8">Delete this quote?</h2>
            <p className="border-l-2 border-border pl-4 font-serif text-lg text-foreground-secondary line-clamp-2">“{quote.text}”</p>
            <p className="text-sm text-muted-foreground">This can&apos;t be undone.</p>

            <div className="mt-2 flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    type="button"
                    className="px-4 py-2.5 rounded-lg border border-border text-foreground font-medium cursor-pointer hover:bg-foreground/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-2/50 transition"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    type="button"
                    className="px-4 py-2.5 rounded-lg bg-error text-on-accent font-medium shadow-sm cursor-pointer hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-error/50 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
