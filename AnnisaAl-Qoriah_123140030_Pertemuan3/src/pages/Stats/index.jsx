import Card from '../../components/ui/Card'
import { useBooks } from '../../context/BookContext'
import { useBookStats } from '../../hooks/useBookStats'

export default function Stats(){
  const { books } = useBooks()
  const { total, byStatus, latest } = useBookStats(books)

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <Card>
        <h2 className="text-xl font-bold mb-3">Ringkasan</h2>
        <ul className="space-y-2">
          <li>Total buku: <strong>{total}</strong></li>
          <li>Milik: <strong>{byStatus.owned || 0}</strong></li>
          <li>Sedang dibaca: <strong>{byStatus.reading || 0}</strong></li>
          <li>Ingin dibeli: <strong>{byStatus.wishlist || 0}</strong></li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-3">Terbaru Ditambahkan</h2>
        <ol className="list-decimal list-inside space-y-1">
          {latest.length === 0 && <p className="text-sm text-brand-brown/70">Belum ada data.</p>}
          {latest.map(b => (
            <li key={b.id}>
              <span className="font-semibold">{b.title}</span> <span className="text-brand-brown/70">— {b.author}</span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  )
}
