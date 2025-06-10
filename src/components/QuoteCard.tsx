export default function QuoteCard({ quote, onDelete }: { 
    quote: { id: string, text: string, author: string, tags?: string[], notes?: string }, 
    onDelete: () => void }) 
    {
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <p className="text-lg font-semibold">“{quote.text}”</p>
      <p className="text-sm text-gray-600 italic">— {quote.author}</p>
      <div>
        <p className="text-sm text-gray-600">Notes</p>
        <div>{quote.notes}</div>
      </div>
      <button onClick={onDelete} className="text-red-500 text-sm mt-2">Delete</button>
    </div>
  );
}
