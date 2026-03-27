'use client'

import Wad from '@/app/assets/prefabs/wad.json'
import Image from 'next/image'
import Papa from 'papaparse'
import { useContext, useEffect, useState } from 'react'
import CopyButton from '../components/CopyButton'
import { PrefabContext } from './prefabContext'
import Sidebar from './Sidebar'

export type PrefabRaw = {
    fam: string
    group: string
    dif: string
    img: string
    credit: string | Array<string>
    devNote: string
    entity_string_json: string
}

export type Prefab = Omit<PrefabRaw, 'entity_string_json'> & {
    entity_string: string
}

type props = {
    defaultPrefabsURL: string
}

export default function Content({ defaultPrefabsURL }: props) {
    const [prefabsData, setPrefabsData] = useState<Array<Prefab> | null>(null)
    const localFallbackURL = '/prefabs - prefabs.tsv'
    const [isLoading, setLoading] = useState(true)
    const ctx = useContext(PrefabContext)
    if (!ctx) {
        return
    }
    const [search] = ctx.search
    const [searchRegex] = ctx.searchRegex
    const [viewMode] = ctx.viewMode
    const [prototypeColor] = ctx.prototypeColor
    const [trimColor] = ctx.trimColor
    const [trimStyle] = ctx.trimStyle

    function SingleDataToReal(row: PrefabRaw) {
        const parsed: string = JSON.parse(row.entity_string_json)
        const output: Prefab = { ...row, entity_string: parsed }
        return output
    }

    function AllDataToReal(data: Array<PrefabRaw>) {
        return data.map((raw: PrefabRaw) => SingleDataToReal(raw))
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
                            setPrefabsData(AllDataToReal(results.data as Array<PrefabRaw>))
                        },
                    })
                    setLoading(false)
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
                        setPrefabsData(AllDataToReal(results.data as Array<PrefabRaw>))
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

    if (!prefabsData) return <div className='flex justify-center items-center h-screen'>Data failed to load!</div>

    const uniqueGroups = Array.from(
        new Map(prefabsData.map((v: Prefab) => [v.group, { group: v.group, img: v.img }])).values(),
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

    function SendPrefab(data: string) {
        const output: string = data
            .replaceAll(Wad.default.trim.color, trimColor)
            .replaceAll(Wad.default.trim.style, trimStyle)
            .replaceAll(Wad.default.prototype.color, prototypeColor)
            .replaceAll('@@@_REPLACE_ME_@@@', Date.now().toString())
            .replaceAll('__TB_empty', `128_${prototypeColor}_3`)

        navigator.clipboard.writeText(output)
    }

    type GroupCreditProps = {
        uGroup: { group: string }
    }

    const GroupCredit = ({ uGroup }: GroupCreditProps) => {
        const l = []
        return prefabsData.map((pre: Prefab) => {
            if (pre.credit && pre.credit instanceof Array && l.length < 1 && pre.group === uGroup.group) {
                l.push(pre.credit)
                return (
                    <div className='text-green-700 text-center font-atkinson' key={pre.credit.toString() + pre.group}>
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
                                            alt={`a 2d SVG preview for the 3d brush group named ${uniqueGroup.group}`}
                                        />
                                    </div>
                                )}
                            </div>
                            <div>
                                <GroupCredit uGroup={uniqueGroup} />
                                <div className='flex flex-wrap gap-1.5'>
                                    {prefabsData.map((pre: Prefab) => {
                                        if (pre.group === uniqueGroup.group) {
                                            return (
                                                <CopyButton
                                                    prefab={pre}
                                                    callback={SendPrefab}
                                                    className='p-0.5 flex-grow w-16 min-w-16 rounded-md font-medium'
                                                    key={pre.dif}
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

    const IndividualView = () => (
        <div className='flex flex-wrap gap-2'>
            {prefabsData.map((v: Prefab) => {
                return (
                    // CARD
                    SearchMatch(v.group + v.dif) && (
                        <div
                            className='p-1 bg-solid-dark h-10 w-64 justify-between flex rounded-md gap-2 text-lg truncate'
                            key={v.group + v.dif}
                        >
                            {v.img && <img src={`${v.img}`} height={'32px'} width={'32px'} className='p-0.5' />}
                            <CopyButton
                                text={v.group + (v.dif && ' — ' + v.dif)}
                                prefab={v}
                                callback={SendPrefab}
                                className='w-full truncate rounded-md'
                                key={v.group + v.dif}
                            />
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
            <div className='w-full'>{viewMode ? <GroupView /> : <IndividualView />}</div>
        </div>
    )
}
