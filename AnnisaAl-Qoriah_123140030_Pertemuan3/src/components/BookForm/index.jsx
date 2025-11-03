import { useEffect, useMemo, useState } from 'react'
import { useBooks } from '../../context/BookContext'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Card from '../ui/Card'

const EMPTY = { title:'', author:'', status:'owned' }

export default function BookForm({ editing }){
  const { add, update } = useBooks()
  const [form, setForm] = useState(editing || EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(()=>{ setForm(editing || EMPTY) }, [editing])

  function validate(next){
    const e = {}
    if(!next.title.trim()) e.title = 'Judul wajib diisi.'
    if(!next.author.trim()) e.author = 'Penulis wajib diisi.'
    if(!['owned','reading','wishlist'].includes(next.status)) e.status = 'Status tidak valid.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function onChange(e){
    const next = { ...form, [e.target.name]: e.target.value }
    setForm(next)
    validate(next)
  }

  function onSubmit(e){
    e.preventDefault()
    if(!validate(form)) return
    if(form.id){ update(form) } else { add(form) }
    setForm(EMPTY)
  }

  const isValid = useMemo(()=>Object.keys(errors).length === 0, [errors])

  return (
    <Card>
      <form onSubmit={onSubmit} className="grid md:grid-cols-5 gap-3 items-end">
        <div className="md:col-span-2">
          <label className="text-sm font-semibold">Judul Buku</label>
          <Input name="title" value={form.title} onChange={onChange} placeholder="Masukkan Judul Buku..." />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-semibold">Penulis</label>
          <Input name="author" value={form.author} onChange={onChange} placeholder="Masukkan Nama Penulis..." />
          {errors.author && <p className="text-red-600 text-sm mt-1">{errors.author}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold">Status</label>
          <Select name="status" value={form.status} onChange={onChange} aria-label="Status">
            <option value="owned">Milik</option>
            <option value="reading">Sedang Dibaca</option>
            <option value="wishlist">Ingin Dibeli</option>
          </Select>
          {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
        </div>
        <div className="md:col-span-5">
          <Button type="submit" disabled={!isValid && !form.id}>
            {form.id ? 'Simpan Perubahan' : 'Tambah Buku'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
