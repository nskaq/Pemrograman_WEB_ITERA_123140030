import { useBooks } from '../../context/BookContext'
import Card from '../ui/Card'
import Input from '../ui/Input'
import Select from '../ui/Select'

export default function BookFilter(){
  const { filter, setFilter, query, setQuery } = useBooks()

  return (
    <Card className="flex flex-col md:flex-row gap-3 items-center justify-between">
      <div className="flex items-center gap-3 w-full md:w-auto">
        <span className="badge">Filter</span>
        <Select value={filter} onChange={(e)=> setFilter(e.target.value)} aria-label="Filter">
          <option value="all">Semua</option>
          <option value="owned">Milik</option>
          <option value="reading">Sedang Dibaca</option>
          <option value="wishlist">Ingin Dibeli</option>
        </Select>
      </div>
      <div className="w-full md:w-80">
        <Input value={query} onChange={(e)=> setQuery(e.target.value)} placeholder="Cari judul atau penulis..." />
      </div>
    </Card>
  )
}
