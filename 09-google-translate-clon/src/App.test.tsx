// Para hacer el test utilizaremos 'vitest'
// 'npm install vitest happy-dom @testing-library/react @testing-library/user-event -D'
// 'happy-dom' es para simular el DOM y no tener que levantar el navegador
// '@testing-library/react' nos da una serie de utilidades para los componentes de react
// '@testing-library/user-event' para simular un usuario, ej: cuando está tecleando en el TextArea
// En el 'vite.config.ts' añadimos 'test'

import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// TEST que simula un END TO END, realiza todo el proceso de introducir los datos, llamar a la API
// y mostrar el resultado
test('My App work as expected', async () => {
  // el 'setup()' hay que ponerlo antes del render
  const user = userEvent.setup()

  const app = render(<App />)

  const textareaFrom = app.getByPlaceholderText('Introducir texto')

  await user.type(textareaFrom, 'Hola mundo')

  const result = await app.findByDisplayValue(/Hello world/i, {}, { timeout: 2000 })

  expect(result).toBeTruthy()
})
