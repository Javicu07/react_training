import { createContext, useState } from 'react'

// 1. Crear Contexto
export const CartContext = createContext()

// 2. Crear Provider
export function CartProvider ({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = product => {
    // Chequear si el producto está ya en el carrito
    const productInCartIndex = cart.findIndex(item => item.id === product.id)

    // No se usa el spread operator ya que este hace una copia superficial
    if (productInCartIndex >= 0) {
      // Una forma usando 'structuredClone'
      const newCart = structuredClone(cart) // 'structuredClone' hace copia profunda de array y object
      newCart[productInCartIndex].quantity += 1
      return setCart(newCart)
    }

    // Si el producto no está en el carrito
    setCart(prevState => ([
      ...prevState,
      {
        ...product,
        quantity: 1
      }
    ]))
  }

  const removeFromCart = product => {
    setCart(prevState => prevState.filter(item => item.id !== product.id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
