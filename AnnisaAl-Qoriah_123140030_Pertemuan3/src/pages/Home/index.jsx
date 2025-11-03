import BookFilter from '../../components/BookFilter'
import BookList from '../../components/BookList'

export default function Home(){
  return (
    <div className="space-y-5">
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-primary">Koleksi Buku Pribadi</h1>
        <p className="text-brand-brown/80">Catatan buku yang sedang dibaca atau wishlist belanja.</p>
      </div>
      <BookFilter />
      <BookList />
    </div>
  )
}
