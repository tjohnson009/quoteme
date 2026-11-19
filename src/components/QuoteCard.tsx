import { useState } from "react";
import { Quote } from "@/services/quotes";

interface QuoteCardProps {
    quote: Quote;
    onEdit: () => void;
    onDelete: () => void;
}

export default function QuoteCard({ quote, onEdit, onDelete }: QuoteCardProps) {
  const [showNotes, setShowNotes] = useState(false);
  const hasTags = quote.tags && quote.tags.length > 0;
  const hasNotes = Boolean(quote.notes && quote.notes.trim());

  return (
    <div className="border border-border p-6 rounded-2xl shadow-sm hover:shadow-md bg-background-secondary break-words transition-shadow">
      <blockquote className="border-l-2 border-accent-2 pl-4 font-serif text-xl leading-relaxed text-foreground">“{quote.text}”</blockquote>
      {quote.author !== "Unknown" && (
        <p className="mt-3 pl-4 text-xs uppercase tracking-widest text-muted-foreground">{quote.author}</p>
      )}

      {/* tags always show, they're short and help when scanning */}
      {hasTags && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {quote.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-background border border-border text-foreground-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* notes can be long, so they stay hidden until asked for */}
      {hasNotes && (
        <div className="mt-4">
          <button
            onClick={() => setShowNotes(!showNotes)}
            type="button"
            aria-expanded={showNotes}
            className="flex items-center gap-1 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition"
          >
            {showNotes ? "Hide notes" : "Show notes"}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${showNotes ? "rotate-180" : ""}`} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          {showNotes && (
            <div className="mt-2 text-sm text-foreground-secondary bg-background rounded-lg px-3 py-2 whitespace-pre-wrap">{quote.notes}</div>
          )}
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-border flex gap-4">
        <button
          onClick={onEdit}
          className="text-sm font-medium text-foreground-secondary cursor-pointer hover:text-foreground transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-sm font-medium text-foreground-secondary cursor-pointer hover:text-error transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
