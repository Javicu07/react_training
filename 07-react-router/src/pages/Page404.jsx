import { Link } from '../Link.jsx'

export default function Page404 () {
  return (
    <>
      <div>
        <h1>This is NOT fine</h1>
        <img src='https://giphy.com/gifs/this-is-fine-9M5jK4GXmD5o1irGrF' alt='This is NOT fine image' />
      </div>

      <Link to='/'>Volver a Home</Link>
    </>
  )
}
