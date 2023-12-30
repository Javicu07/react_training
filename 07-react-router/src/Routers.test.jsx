import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Routers } from './Routers.jsx'
import { getCurrentPath } from './utils.js'
import { Link } from './Link.jsx'
import { Route } from './Route.jsx'

vi.mock('./utils.js', () => ({
  getCurrentPath: vi.fn()
}))

describe('Routers', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should render whitout problems', () => {
    render(<Routers routes={[]} />)
    expect(true).toBeTruthy()
  })

  it('should render 404 if no routes match', () => {
    render(<Routers routes={[]} defaultComponent={() => <h1>404</h1>} />)
    expect(screen.getByText('404')).toBeTruthy()
  })

  it('should render the component of the first route that matches', () => {
    getCurrentPath.mockReturnValue('/about')

    const routes = [
      {
        path: '/',
        Component: () => <h1>Home</h1>
      },
      {
        path: '/about',
        Component: () => <h1>About</h1>
      }
    ]

    render(<Routers routes={routes} />)
    expect(screen.getByText('About')).toBeTruthy()
  })

  it('should navigate using links', async () => {
    getCurrentPath.mockReturnValueOnce('/')

    render(
      <Routers>
        <Route
          path='/' Component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link to='/about'>Go To About</Link>
              </>
            )
          }}
        />
        <Route path='/about' Component={() => <h1>About</h1>} />
      </Routers>
    )

    // Click on the link
    const button = screen.getByText(/Go To About/)
    fireEvent.click(button)

    const aboutTitle = await screen.findByText('About')

    // Check that new route is rendered
    expect(aboutTitle).toBeTruthy()
  })
})
