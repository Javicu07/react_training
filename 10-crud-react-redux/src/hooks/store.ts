import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

// lo anterior se puede estudiar a profundida en la documentación de redux, gracias a esto
// se logra una capa de abstracción entre nuestros componentes y redux, en el futuro es más
// fácil lograr cambiar por ejemplo 'redux' y evitamos que la aplicación se rompa
