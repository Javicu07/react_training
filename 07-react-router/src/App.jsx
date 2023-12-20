import { useState, useEffect } from 'react'
import './App.css'
import { EVENTS } from './assets/consts'

// Función que va a cambiar la url
function navigate (href) {
  window.history.pushState({}, '', href)
  // Crear un evento personalizado y lo despacha
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

function HomePage () {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es una pagina de ejemplo para crear React Router desde cero</p>
      <a href='/about'>Ir a Sobre nosotros</a>
    </>
  )
}

function AboutPage () {
  return (
    <>
      <h1>About</h1>
      <div>
        <img
          src='https://ssbworld.com/images/character-profiles/square/donkey_00.png'
          alt='Foto de ejemplo'
        />
        <p>Creando un clon de React Router</p>
      </div>
      <a href='/'>Ir a Home</a>
    </>
  )
}

function App () {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)
    /* 'popstate' es el evento que se lanza cuando se le da al botón de ir atrás en el navegador */

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  return (
    <main>
      {currentPath === '/' && <HomePage />}
      {currentPath === '/about' && <AboutPage />}
    </main>
  )
}

export default App
