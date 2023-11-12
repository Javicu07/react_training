// 'npm install standard -D' --> instala configuracion de linter
// 'npm init playwright@latest' --> para hacer tests

import { createRoot } from 'react-dom/client'
import { App } from './src/App.jsx'

const root = createRoot(document.getElementById('app'))
root.render(<App />)
