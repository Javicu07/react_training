import { createContext, useState } from 'react'

// Revisar que es Singleton, módulo de JavaScript

// 1. Crear el Contexto. Este es el que tenemos que consumir
export const FiltersContext = createContext()

// 2. Crear el Provider, para proveer el Contexto. Este es el que nos provee de acceso al contexto
export function FiltersProvider ({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  return (
    <FiltersContext.Provider value={{
      filters,
      setFilters
    }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
