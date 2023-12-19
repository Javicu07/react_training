export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

// Update localStorage with state for cart
export const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
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

        // Otra forma usando el 'map'
        /*
        const newState = state.map(item =>{
          if(item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        })
        */

        // Otra forma usando el spread operator
        /*
        const newState = [
          ...state.slice(0, productInCartIndex),
          {...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1},
          ...state.slice(productInCartIndex + 1)
        ]
        */

        updateLocalStorage(newState)
        return newState
      }

      const newState = [
        ...state,
        {
          ...actionPayload, // product
          quantity: 1
        }
      ]

      updateLocalStorage(newState)
      return newState
    }

    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { id } = actionPayload
      const newState = state.filter(item => item.id !== id)
      updateLocalStorage(newState)
      return newState
    }

    case CART_ACTION_TYPES.CLEAR_CART: {
      updateLocalStorage([])
      return []
    }
  }
  return state
}
