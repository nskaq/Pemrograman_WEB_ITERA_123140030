import { useCallback, useEffect, useRef, useState } from 'react'

export function useLocalStorage(key, defaultValue){
  const isMounted = useRef(false)
  const [value, setValue] = useState(()=>{
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(()=>{
    if(!isMounted.current){ isMounted.current = true; return }
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }, [key, value])

  const remove = useCallback(()=>{
    try { localStorage.removeItem(key) } catch {}
  }, [key])

  return [value, setValue, remove]
}
