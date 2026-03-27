'use client'

import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { Prefab } from './types/Prefab'

export const PrefabContext = createContext<PrefabContextValue | null>(null)

type PrefabContextValue = {
    search: [string, Dispatch<SetStateAction<string>>]
    trimColor: [string, Dispatch<SetStateAction<string>>]
    trimStyle: [string, Dispatch<SetStateAction<string>>]
    prototypeColor: [string, Dispatch<SetStateAction<string>>]

    searchRegex: [boolean, Dispatch<SetStateAction<boolean>>]
    viewMode: [boolean, Dispatch<SetStateAction<boolean>>]
    viewSidebar: [boolean, Dispatch<SetStateAction<boolean>>]
}

export function PrefabProvider({ children }: { children: React.ReactNode }) {
    const [search, setSearch] = useState('')
    const [searchRegex, setSearchRegex] = useState(false)
    const [viewMode, setViewMode] = useState(true)
    const [viewSidebar, setViewSidebar] = useState(true)
    const [trimColor, setTrimColor] = useState('')
    const [trimStyle, setTrimStyle] = useState('')
    const [prototypeColor, setPrototypeColor] = useState('')
    // const [dataSourceURL, setDataSourceURL] = useState('')
    const [dataSources, setDataSources] = useState<Prefab[] | null>(null)

    const value: PrefabContextValue = {
        search: [search, setSearch],
        searchRegex: [searchRegex, setSearchRegex],
        viewMode: [viewMode, setViewMode],
        viewSidebar: [viewSidebar, setViewSidebar],
        trimColor: [trimColor, setTrimColor],
        trimStyle: [trimStyle, setTrimStyle],
        prototypeColor: [prototypeColor, setPrototypeColor],
    }

    return <PrefabContext.Provider value={value}>{children}</PrefabContext.Provider>
}
