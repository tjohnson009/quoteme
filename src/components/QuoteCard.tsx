import { Quote } from "@/services/quotes";

interface QuoteCardProps {
    quote: Quote;
    onEdit: () => void;
    onDelete: () => void;
}

export default function QuoteCard({ quote, onEdit, onDelete }: QuoteCardProps) {
  return (
    <div className="border p-8 min-h-50 rounded-xl shadow-sm bg-background-secondary hover:border-transparent">
      <p className="text-lg font-semibold fg-primary">“{quote.text}”</p>
      <p className="text-sm fg-primary italic">{quote.author !== "Unknown" && (quote.author)}</p>
      <div>
        <p className="text-sm text-gray-600">{quote.notes ? `Notes` : ''}</p>
        <div>{quote.notes}</div>
      </div>
      <div className="mt-2 flex gap-3">
        <button onClick={onEdit} className="text-accent-2 text-sm">Edit</button>
        <button onClick={onDelete} className="text-error text-sm">Delete</button>
      </div>
    </div>
  );
}
