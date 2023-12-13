export const cartInitialState = []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
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

    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { id } = actionPayload
      return state.filter(item => item.id !== id)
    }

    case CART_ACTION_TYPES.CLEAR_CART: {
      return cartInitialState
    }
  }
  return state
}
