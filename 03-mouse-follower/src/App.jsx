import { useEffect, useState } from "react"

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0})

  // pointer move
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if(enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // cleanup se ejecuta:
    // --> cuando se desmonta el componente
    // --> cuando cambian las dependencias, antes de ejecutar el efecto de nuevo
    return () => { // --> cleanuo method
      window.removeEventListener('pointermove', handleMove)
    } // clean the effect
  }, [enabled])

  // change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  // useEffect se ejecuta:
  // [] --> solo se ejecuta una vez cuando se monta el componente
  // [enabled] --> se ejecuta cuando cambia enabled y cuando se monta el componente
  // undefined --> se ejecuta cada vez que se renderiza el componente

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Disable' : 'Enable'} Pointer Follower
      </button>
    </>
  )
}

function App() {
  return(
    <main>
      <FollowMouse />  
    </main>
  )
}

export default App
