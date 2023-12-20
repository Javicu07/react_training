import { Link } from '../Link.jsx'

export default function AboutPage () {
  return (
    <>
      <h1>About</h1>
      <div>
        <img
          src='https://ssbworld.com/images/character-profiles/square/donkey_00.png'
          alt='Foto de ejemplo'
        />
        <p>Creando un clon de React Router</p>
      </div>
      <Link to='/'>Ir a Home</Link>
    </>
  )
}
