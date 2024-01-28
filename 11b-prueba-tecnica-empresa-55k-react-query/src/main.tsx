import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Como tiene un estado global, tiene un contexto y necesitamos tener un 'provider'
// TanStack Query o React Query nos va a simplificar mucho el códido de 'App.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
  </QueryClientProvider>
)
