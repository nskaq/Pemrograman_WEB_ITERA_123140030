import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const BookContext = createContext()

const initialState = {
  books: [],
  filter: 'all', // all | owned | reading | wishlist
  query: '',
}

function reducer(state, action){
  switch(action.type){
    case 'INIT':
      return { ...state, books: action.payload || [] }
    case 'ADD':
      return { ...state, books: [action.payload, ...state.books] }
    case 'UPDATE':
      return { ...state, books: state.books.map(b => b.id === action.payload.id ? action.payload : b) }
    case 'DELETE':
      return { ...state, books: state.books.filter(b => b.id !== action.payload) }
    case 'SET_FILTER':
      return { ...state, filter: action.payload }
    case 'SET_QUERY':
      return { ...state, query: action.payload }
    default:
      return state
  }
}

export function BookProvider({ children }){
  const [persisted, setPersisted] = useLocalStorage('books:v1', [])
  const [state, dispatch] = useReducer(reducer, initialState)

  // load from localStorage once
  useEffect(()=>{ dispatch({ type: 'INIT', payload: persisted }) }, []) // eslint-disable-line

  // persist whenever books change
  useEffect(()=>{ setPersisted(state.books) }, [state.books, setPersisted])

  const actions = useMemo(()=>({
    add(book){
      const payload = { id: crypto.randomUUID(), createdAt: Date.now(), ...book }
      dispatch({ type: 'ADD', payload })
    },
    update(book){ dispatch({ type: 'UPDATE', payload: book }) },
    remove(id){ dispatch({ type: 'DELETE', payload: id }) },
    setFilter(f){ dispatch({ type: 'SET_FILTER', payload: f }) },
    setQuery(q){ dispatch({ type: 'SET_QUERY', payload: q }) },
  }), [])

  const filtered = useMemo(()=>{
    const q = state.query.trim().toLowerCase()
    return state.books.filter(b => {
      const matchesStatus = state.filter === 'all' ? true : b.status === state.filter
      const matchesQuery = q ? (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)) : true
      return matchesStatus && matchesQuery
    })
  }, [state.books, state.filter, state.query])

  return (
    <BookContext.Provider value={{ ...state, filtered, ...actions }}>
      {children}
    </BookContext.Provider>
  )
}

export function useBooks(){
  const ctx = useContext(BookContext)
  if(!ctx) throw new Error('useBooks must be used within BookProvider')
  return ctx
}
