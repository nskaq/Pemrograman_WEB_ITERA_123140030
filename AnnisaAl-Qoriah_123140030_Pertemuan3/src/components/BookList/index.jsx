import { useState } from 'react'
import { useBooks } from '../../context/BookContext'
import Card from '../ui/Card'
import BookItem from './BookItem'
import BookForm from '../BookForm'

export default function BookList(){
  const { filtered, remove } = useBooks()
  const [editing, setEditing] = useState(null)

  return (
    <div className="space-y-4">
      <BookForm editing={editing} />

      <Card>
        <ul className="space-y-3">
          {filtered.length === 0 && (
            <p className="text-sm text-brand-brown/70">Belum ada buku. Tambahkan Daftar Buku</p>
          )}
          {filtered.map(b => (
            <BookItem key={b.id} book={b} onEdit={setEditing} onDelete={remove} />
          ))}
        </ul>
      </Card>
    </div>
  )
}
