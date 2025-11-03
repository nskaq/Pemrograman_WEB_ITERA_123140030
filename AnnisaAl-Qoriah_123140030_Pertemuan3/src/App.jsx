import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Stats from './pages/Stats'

export default function App() {
  return (
    <div>
      <header className="border-b border-brand-soft/40 bg-white sticky top-0 z-10">
        <div className="container-xl py-4 flex items-center justify-between">
          <NavLink to="/" className="text-2xl font-poppins tracking-wide text-brand-primary">APLIKASI MANAJEMEN BUKU PRIBADI</NavLink>
          <nav className="flex gap-2">
            <NavLink to="/" className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-ghost'}`}>Beranda</NavLink>
            <NavLink to="/stats" className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-ghost'}`}>Statistik</NavLink>
          </nav>
        </div>
      </header>

      <main className="container-xl py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>

     
    </div>
  )
}
