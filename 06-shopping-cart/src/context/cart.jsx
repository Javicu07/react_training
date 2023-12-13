import { createContext, useReducer } from 'react'

// 1. Crear Contexto
export const CartContext = createContext()

const initialState = []

const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case 'ADD_TO_CART': {
      const { id } = actionPayload

      // Chequear si el producto está ya en el carrito
      const productInCartIndex = state.findIndex(item => item.id === id)

      // No se usa el spread operator ya que este hace una copia superficial
      if (productInCartIndex >= 0) {
      // Una forma usando 'structuredClone'
        const newState = structuredClone(state) // 'structuredClone' hace copia profunda de array y object
        newState[productInCartIndex].quantity += 1
        return newState
      }

      return [
        ...state,
        {
          ...actionPayload, // product
          quantity: 1
        }
      ]
    }

    case 'REMOVE_FROM_CART': {
      const { id } = actionPayload
      return state.filter(item => item.id !== id)
    }

    case 'CLEAR_CART': {
      return initialState
    }
  }
  return state
}

// 2. Crear Provider
export function CartProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({ type: 'CLEAN_CART' })

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      clearCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
