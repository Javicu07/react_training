import { Link } from '../Link.jsx'

const i18n = {
  es: {
    title: 'Sobre nosotros',
    description: 'Creando un clon de React Router',
    button: 'Ir a Principal'
  },
  en: {
    title: 'About us',
    description: 'Developving a React Router',
    button: 'Go to Home'
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage ({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')

  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img
          src='https://ssbworld.com/images/character-profiles/square/donkey_00.png'
          alt='Foto de ejemplo'
        />
        <p>{i18n.description}</p>
      </div>
      <Link to='/'>{i18n.button}</Link>
    </>
  )
}
