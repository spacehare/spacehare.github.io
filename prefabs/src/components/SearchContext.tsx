import { createContext } from 'solid-js'

export const SearchContext = createContext<any>(['', (value: string) => {}])
