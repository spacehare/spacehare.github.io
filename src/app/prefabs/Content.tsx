'use client'

import Wad from '@/app/assets/prefabs/wad.json'
import Image from 'next/image'
import Papa from 'papaparse'
import { useContext, useEffect, useState } from 'react'
import CopyButton from '../components/CopyButton'
import { PrefabContext } from './prefabContext'
import Sidebar from './Sidebar'
import { Prefab } from './types/Prefab'
import { PrefabFamily } from './types/PrefabFamily'
import { PrefabRaw } from './types/PrefabRaw'
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

    function Parse(text: string): void {
        Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            quoteChar: '',
            complete: (results) => {
                MakeFamilies(AllDataToReal(results.data as Array<PrefabRaw>), 'DEBUGTEST')
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

    // FIXME
    // there is some kind of behavior like...
    // if a prefab shares a group name, it will merge to another group within a different family!
    const uniqueGroups = Array.from(
        new Map(
            GetAllPrefabs().map((prefab: Prefab) => [prefab.group, { group: prefab.group, img: prefab.img_url }]),
        ).values(),
    )

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

    type GroupCreditProps = {
        uGroup: { group: string }
    }

    const GroupCredit = ({ uGroup }: GroupCreditProps) => {
        const l = []
        return GetAllPrefabs().map((pre: Prefab) => {
            if (pre.credit && pre.credit instanceof Array && l.length < 1 && pre.group === uGroup.group) {
                l.push(pre.credit)
                return (
                    <div
                        className='text-green-700 text-center font-atkinson'
                        key={pre.credit.toString() + pre.group + pre.family}
                    >
                        <span className='font-thin'>Credit: </span>
                        <span className='text-green-600 font-black'>{pre.credit.join(', ')}</span>
                    </div>
                )
            }
        })
    }

    const GroupView = () => (
        <div className='flex flex-wrap gap-1.5'>
            {Object.values(uniqueGroups).map((uniqueGroup) => {
                return (
                    // CARD
                    SearchMatch(uniqueGroup.group) && (
                        <div
                            key={uniqueGroup.group}
                            className='bg-solid-dark justify-between flex flex-col
								p-1.5 w-48 h-60 rounded-md rounded-tr-3xl'
                        >
                            <div className='flex flex-col items-center'>
                                <div className='text-center text-xl font-atkinson'>{uniqueGroup.group}</div>
                                {uniqueGroup.img && (
                                    <div className=''>
                                        <Image
                                            loading='eager'
                                            src={`${uniqueGroup.img}`}
                                            className='p-1.5'
                                            // fill={true}
                                            width={100}
                                            height={100}
                                            alt={`a 2d SVG preview for ${uniqueGroup.group}`}
                                        />
                                    </div>
                                )}
                            </div>
                            <div>
                                <GroupCredit uGroup={uniqueGroup} />
                                <div className='flex flex-wrap gap-1.5'>
                                    {GetAllPrefabs().map((pre: Prefab) => {
                                        if (pre.group === uniqueGroup.group) {
                                            return (
                                                <CopyButton
                                                    prefab={pre}
                                                    callback={SendPrefab}
                                                    className='p-0.5 flex-grow w-16 min-w-16 rounded-md font-medium'
                                                    key={pre.family + pre.group + pre.dif}
                                                />
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                )
            })}
        </div>
    )

    return (
        // PAGE
        <div className='flex gap-2 p-2 justify-between items-start bg-solid-med min-h-screen font-normal'>
            <Sidebar />
            {/* PREFABS */}
            <div className='w-full'>
                {viewMode ? (
                    <GroupView />
                ) : (
                    <IndividualView allPrefabs={GetAllPrefabs()} SearchMatch={SearchMatch} SendPrefab={SendPrefab} />
                )}
            </div>
        </div>
    )
}
