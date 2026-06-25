export default function QuoteCard({ quote, onDelete }: { 
    quote: { id: number, text: string, author: string, tags?: string[], notes?: string }, 
    onDelete: () => void }) {
  return (
    <div className="border p-8 rounded-xl shadow-sm bg-background-secondary hover:border-transparent">
      <p className="text-lg font-semibold fg-primary">“{quote.text}”</p>
      <p className="text-sm fg-primary italic">{quote.author !== "Unknown" && (quote.author)}</p>
      <div>
        <p className="text-sm text-gray-600">{quote.notes ? `Notes` : ''}</p>
        <div>{quote.notes}</div>
      </div>
      <button onClick={onDelete} className="text-error text-sm mt-2">Delete</button>
    </div>
  );
}
