'use client'

import Wad from '@/app/assets/prefabs/wad.json'
import Papa from 'papaparse'
import { useContext, useEffect, useState } from 'react'
import { PrefabContext } from './prefabContext'
import Sidebar from './Sidebar'
import { Prefab } from './types/Prefab'
import { PrefabRaw } from './types/PrefabRaw'
import GroupView from './ViewGroup'
import { IndividualView } from './ViewIndividual'

type props = {
    defaultPrefabsURL: string
}

export default function Content({ defaultPrefabsURL }: props) {
    // const [prefabsData, setPrefabsData] = useState<Array<Prefab> | null>(null)
    const localFallbackURL = '/prefabs - prefabs.tsv'
    const [isLoading, setLoading] = useState(true)
    const ctx = useContext(PrefabContext)
    if (!ctx) return

    const [search] = ctx.search
    const [searchRegex] = ctx.searchRegex
    const [viewMode] = ctx.viewMode
    const [prototypeColor] = ctx.prototypeColor
    const [trimColor] = ctx.trimColor
    const [trimStyle] = ctx.trimStyle
    const [families, setFamilies] = ctx.families
    const MakeFamilies = ctx.MakeFamilies

    function SingleDataToReal(row: PrefabRaw) {
        const parsed_entity: string = JSON.parse(row.entity_string_json)
        const parsed_credit: string[] = row.credit_json_array ? JSON.parse(row.credit_json_array) : null

        const output: Prefab = { ...row, entity_string: parsed_entity, credit: parsed_credit }
        return output
    }

    function AllDataToReal(data: Array<PrefabRaw>): Array<Prefab> {
        return data.map((raw: PrefabRaw) => SingleDataToReal(raw))
    }

    function Parse(text: string, source: string): void {
        Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            quoteChar: '',
            complete: (results) => {
                MakeFamilies(AllDataToReal(results.data as Array<PrefabRaw>), source)
                setLoading(false)
            },
        })
    }

    function GetAllPrefabs() {
        return families
            .map((family) => {
                return family.prefabs
            })
            .flat()
    }

    useEffect(() => {
        function loadFallback() {
            fetch(localFallbackURL)
                .then((res) => res.text())
                .then((text) => {
                    Papa.parse(text, {
                        header: true,
                        skipEmptyLines: true,
                        quoteChar: '',
                        complete: (results) => {
                            MakeFamilies(AllDataToReal(results.data as Array<PrefabRaw>), localFallbackURL)
                            setLoading(false)
                        },
                    })
                })
        }

        fetch(defaultPrefabsURL)
            .then((res) => {
                if (!res.ok) throw new Error('primary fetch failed, ' + res.status)
                else return res.text()
            })
            .then((text) => {
                Papa.parse(text, {
                    header: true,
                    skipEmptyLines: true,
                    quoteChar: '',
                    error: (error: Error) => {
                        console.error(error, '\nFailed to parse, falling back to local URL')
                        loadFallback()
                    },
                    complete: (results) => {
                        MakeFamilies(AllDataToReal(results.data as Array<PrefabRaw>), defaultPrefabsURL)
                        setLoading(false)
                    },
                })
            })
            .catch((error) => {
                console.warn(error, '\nfalling back to local URL')
                loadFallback()
            })
    }, [])

    if (isLoading) return <div className='flex justify-center items-center h-screen'>Loading</div>

    if (!families) return <div className='flex justify-center items-center h-screen'>Data failed to load!</div>

    const SearchMatch = (val: string) => {
        if (searchRegex) {
            return val.match(search)
        } else {
            const a = val.toLowerCase()
            const b = search.toLowerCase()
            return a.includes(b)
        }
    }

    function SendPrefab(data: string): void {
        const output: string = data
            .replaceAll(Wad.default.trim.color, trimColor)
            .replaceAll(Wad.default.trim.style, trimStyle)
            .replaceAll(Wad.default.prototype.color, prototypeColor)
            .replaceAll('@@@_REPLACE_ME_@@@', Date.now().toString()) // TODO regex find the tb_id and tb_group
            .replaceAll('__TB_empty', `128_${prototypeColor}_3`)

        navigator.clipboard.writeText(output)
    }

    return (
        // PAGE
        <div className='flex gap-2 p-2 justify-between items-start bg-solid-med min-h-screen font-normal'>
            <Sidebar />
            {/* PREFABS */}
            <div className='w-full'>
                {viewMode ? (
                    <GroupView allPrefabs={GetAllPrefabs()} SearchMatch={SearchMatch} SendPrefab={SendPrefab} />
                ) : (
                    <IndividualView allPrefabs={GetAllPrefabs()} SearchMatch={SearchMatch} SendPrefab={SendPrefab} />
                )}
            </div>
        </div>
    )
}
