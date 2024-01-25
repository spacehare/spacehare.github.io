import { createContext } from 'solid-js'

export const viewModes = { Group: 'Group', Individual: 'Individual' }

export const sortModes = { Default: 'Default', Name: 'Name' }

export const ViewContext = createContext<any>(['', (value: any) => {}])
