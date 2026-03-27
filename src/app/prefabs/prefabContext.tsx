'use client'

import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { Prefab } from './types/Prefab'
import { PrefabFamily } from './types/PrefabFamily'

export const PrefabContext = createContext<PrefabContextValue | null>(null)

type PrefabContextValue = {
    search: [string, Dispatch<SetStateAction<string>>]
    trimColor: [string, Dispatch<SetStateAction<string>>]
    trimStyle: [string, Dispatch<SetStateAction<string>>]
    prototypeColor: [string, Dispatch<SetStateAction<string>>]

    searchRegex: [boolean, Dispatch<SetStateAction<boolean>>]
    viewMode: [boolean, Dispatch<SetStateAction<boolean>>]
    viewSidebar: [boolean, Dispatch<SetStateAction<boolean>>]

    families: [PrefabFamily[], Dispatch<SetStateAction<PrefabFamily[]>>]

    MakeFamilies: (prefabs: Prefab[], source: string) => void
    AddFamily: (family: PrefabFamily) => void
    ToggleFamilyActive: (family: PrefabFamily, state: boolean) => void
    ToggleFamilyActiveIdx: (idx: number, state: boolean) => void
    RemoveFamily: (family: PrefabFamily) => void
    RemoveFamilyIdx: (idx: number) => void
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
    const [families, setFamilies] = useState<PrefabFamily[]>([])

    function MakeFamilies(prefabs: Prefab[], source: string): void {
        const familyMap = new Map<string, PrefabFamily>()

        for (const prefab of prefabs) {
            if (!familyMap.has(prefab.family)) {
                familyMap.set(prefab.family, {
                    active: true,
                    id: familyMap.size + 1,
                    name: prefab.family,
                    prefabs: [],
                    source: source,
                })
            }
            familyMap.get(prefab.family)!.prefabs.push(prefab)
        }

        const families: PrefabFamily[] = Array.from(familyMap.values())
        setFamilies(families)
    }

    function AddFamily(family: PrefabFamily) {
        setFamilies([...families, family])
    }

    function ToggleFamilyActive(family: PrefabFamily, state: boolean) {
        setFamilies(
            families.map((f) => {
                if (f.id === family.id) {
                    return { ...f, active: state }
                } else {
                    return f
                }
            }),
        )
    }

    // https://react.dev/learn/updating-arrays-in-state#removing-from-an-array
    function ToggleFamilyActiveIdx(idx: number, state: boolean) {
        setFamilies(
            families.map((f) => {
                if (f.id === idx) {
                    return { ...f, active: state }
                } else {
                    return f
                }
            }),
        )
    }

    function RemoveFamily(family: PrefabFamily) {
        setFamilies(families.filter((f) => f.id !== family.id))
    }

    function RemoveFamilyIdx(idx: number) {
        setFamilies(families.filter((f) => f.id !== idx))
    }

    const value: PrefabContextValue = {
        search: [search, setSearch],
        searchRegex: [searchRegex, setSearchRegex],
        viewMode: [viewMode, setViewMode],
        viewSidebar: [viewSidebar, setViewSidebar],
        trimColor: [trimColor, setTrimColor],
        trimStyle: [trimStyle, setTrimStyle],
        prototypeColor: [prototypeColor, setPrototypeColor],
        families: [families, setFamilies],
        MakeFamilies: MakeFamilies,
        AddFamily: AddFamily,
        RemoveFamily: RemoveFamily,
        RemoveFamilyIdx: RemoveFamilyIdx,
        ToggleFamilyActive: ToggleFamilyActive,
        ToggleFamilyActiveIdx: ToggleFamilyActiveIdx,
    }

    return <PrefabContext.Provider value={value}>{children}</PrefabContext.Provider>
}
