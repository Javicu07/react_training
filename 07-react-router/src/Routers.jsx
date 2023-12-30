import { EVENTS } from './consts.js'
import { useState, useEffect, Children } from 'react'
import { match } from 'path-to-regexp'
import { getCurrentPath } from './utils.js'

export function Routers ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)
    /* 'popstate' es el evento que se lanza cuando se le da al botón de ir atrás en el navegador */

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  // Add routes from children <Route /> components
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    // Hemos usado path-to-regexp para poder detectar rutas dinámicas como por ejemplo
    // /search/:query <-- :query es una ruta dinámica
    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    // Guardar los parámetros de Url que eran dinámicos y que hemos extraído con
    // path-to-regexp; por ejemplo, si la ruta es /search/:query y la ruta es
    // /search/javascript
    // matched.params.query === 'javascript'
    routeParams = matched.params
    return true
  })?.Component

  return (
    Page
      ? <Page routeParams={routeParams} />
      : <DefaultComponent routeParams={routeParams} />
  )
}
