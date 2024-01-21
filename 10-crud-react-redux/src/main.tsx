import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { store } from './store/index.ts'
import { Provider } from 'react-redux'
// utilizando el 'Provider' de 'react-redux' se la pasamos a toda nuestra aplicación, desde cualquier
// parte de nuestra aplicación podemos leer la 'store' y pasar acciones a esta

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
