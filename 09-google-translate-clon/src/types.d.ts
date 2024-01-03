import { type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES } from './constants'

// el type de los lenguajes podría hacerse de esta forma:
// export type Language = 'en' | 'es' | 'de' | 'auto'
// en este caso no sería recomendable porque tendríamos las constantes en ambos sitios
// y sería poco escalable y mantenible; es mejor hacerlo de es la siguiente forma:
export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

// Cuando se escribe el contrato de un objeto, es más recomendable utilizar 'interface' en lugar
// de 'type', las interfaces son más fáciles de extender, lo que se suele hacer es que directamente
// si es un objeto se utiliza un 'interface'
export interface State {
  fromLanguage: string
  toLanguage: string
  fromText: string
  result: string
  loading: boolean
}

export type Action =
  | { type: 'INTERCHANGE_LANGUAGES' }
  | { type: 'SET_FROM_LANGUAGE', payload: FromLanguage }
  | { type: 'SET_TO_LANGUAGE', payload: Language }
  | { type: 'SET_FROM_TEXT', payload: string }
  | { type: 'SET_RESULT', payload: string }
