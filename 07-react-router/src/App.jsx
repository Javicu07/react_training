import { Suspense, lazy } from 'react'
// lazy es una función de react que nos permite importar de forma dinámica los componentes
// de esa forma mejoramos el rendimiento

import './App.css'

import Page404 from './pages/404.jsx' // import estático
import SearchPage from './pages/Search.jsx' // import estático

import { Routers } from './Routers.jsx'
import { Route } from './Route.jsx'

const LazyHomePage = lazy(() => import('./pages/Home.jsx')) // import dinámico
const LazyAboutPage = lazy(() => import('./pages/About.jsx')) // import dinámico

const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App () {
  return (
    <main>
      {/* Si utilizamos la función 'lazy' para un renderizado dinámico es necesario envolver
      esa parte del renderizado dentro del componente '<Suspense>' que indica que no sabe si
      tiene que renderizar una parte o no. Se le puede agregar un 'fallback' para que renderice
      lo que indiquemos en lugar de lo que no se puede renderizar todavía */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routers routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Routers>
      </Suspense>
    </main>
  )
}

export default App
