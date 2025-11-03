import { useMemo } from 'react'

export function useBookStats(books){
  return useMemo(()=>{
    const total = books.length
    const byStatus = books.reduce((acc, b)=>{
      acc[b.status] = (acc[b.status] || 0) + 1
      return acc
    }, { owned:0, reading:0, wishlist:0 })

    const latest = [...books].sort((a,b)=> b.createdAt - a.createdAt).slice(0,5)

    return { total, byStatus, latest }
  }, [books])
}
