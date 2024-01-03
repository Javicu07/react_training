import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useReducer } from 'react'
import { type State } from './types'

// 1. Crear estado inicial
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

// 2. Crear el reducer
// Un 'Reducer' recibe el estado que tengamos y la acción
function reducer (state: State, action) {
  const { type, payload } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: payload
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: payload
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromText: payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: payload
    }
  }

  return state
}

function App () {
  // 3. Usar el hook useReducer, que nos devuelve el state y el dispatch
  const [state, dispatch] = useReducer(initialState, reducer)

  return (
    <div className='App'>
      <h1>Google Translate Clon</h1>
    </div>
  )
}

export default App
