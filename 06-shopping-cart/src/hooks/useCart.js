import { useContext } from 'react'
import { CartContext } from '../context/cart.jsx'

export const useCart = () => {
  const context = useContext(CartContext)

  // Es buena práctica en los 'custom hook' que consumen un contexto, revisar si el contexto
  // leído es undefined
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
