import { useState } from "react";
import { Quote } from "@/services/quotes";

interface QuoteCardProps {
    quote: Quote;
    onEdit: () => void;
    onDelete: () => void;
}

export default function QuoteCard({ quote, onEdit, onDelete }: QuoteCardProps) {
  const [showTags, setShowTags] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const hasTags = quote.tags && quote.tags.length > 0;
  const hasNotes = Boolean(quote.notes && quote.notes.trim());

  return (
    <div className="border border-border p-6 sm:p-8 min-h-50 rounded-xl shadow-sm bg-background-secondary break-words">
      <p className="text-lg font-semibold text-foreground">“{quote.text}”</p>
      <p className="text-sm text-foreground-secondary italic">{quote.author !== "Unknown" && (quote.author)}</p>
      {hasTags && (
        <div className="mt-2">
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showTags}
              onChange={(e) => setShowTags(e.target.checked)}
              className="cursor-pointer"
            />
            Show tags
          </label>
          {showTags && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {quote.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-accent-1/10 text-accent-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      {hasNotes && (
        <div className="mt-2">
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showNotes}
              onChange={(e) => setShowNotes(e.target.checked)}
              className="cursor-pointer"
            />
            Show notes
          </label>
          {showNotes && (
            <div className="mt-2 text-sm text-foreground-secondary whitespace-pre-wrap">{quote.notes}</div>
          )}
        </div>
      )}
      <div className="mt-2 flex gap-3">
        <button
          onClick={onEdit}
          className="text-accent-2 text-sm font-medium cursor-pointer hover:brightness-110 transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-error text-sm font-medium cursor-pointer hover:brightness-110 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
