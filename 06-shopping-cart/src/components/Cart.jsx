import './Cart.css'

import { useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons'

export function Cart () {
  const cartCheckboxId = useId()

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          <li>
            <img
          </li>
        </ul>
      </aside>
    </>
  )
}
