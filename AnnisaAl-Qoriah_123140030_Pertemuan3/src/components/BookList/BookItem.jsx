import Button from '../ui/Button'

const label = { owned:'Milik', reading:'Sedang Dibaca', wishlist:'Ingin Dibeli' }

export default function BookItem({ book, onEdit, onDelete }){
  return (
    <li className="card flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-brand-primary">{book.title}</h3>
        <p className="text-sm text-brand-brown/80">{book.author}</p>
        <p className="mt-2"><span className="badge">{label[book.status]}</span></p>
      </div>
      <div className="flex gap-2">
        <Button onClick={()=> onEdit(book)} className="btn-ghost">Edit</Button>
        <button onClick={()=> onDelete(book.id)} className="btn btn-danger">Hapus</button>
      </div>
    </li>
  )
}
