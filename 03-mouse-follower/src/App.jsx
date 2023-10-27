import { useEffect, useState } from "react"

function App() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    console.log('efecto')
  })
  return (
    <>
      <h3>Project 3</h3>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Disable' : 'Enable'} Pointer Follower
      </button>
    </>
  )
}

export default App
