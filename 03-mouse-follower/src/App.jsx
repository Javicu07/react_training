import { useEffect, useState } from "react"

function App() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0})

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if(enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // --> it´s executed when the component is dismount
    // --> when change the dependencies, before running the effect again
    return () => {
      window.removeEventListener('pointermove', handleMove)
    } // clean the effect
  }, [enabled])

  return (
    <main>
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
    </main>
  )
}

export default App
