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
