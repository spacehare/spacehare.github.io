'use client'

import Papa from 'papaparse'
import { useContext, useEffect, useState } from 'react'
import { AllDataToReal } from './Content'
import { PrefabContext } from './prefabContext'
import { PrefabFamily } from './types/PrefabFamily'
import { PrefabRaw } from './types/PrefabRaw'

type props = {
    families: PrefabFamily[]
}

export function FamiliesPanel({ families }: props) {
    const ctx = useContext(PrefabContext)
    if (!ctx) return
    const [defaultURL] = ctx.defaultURL

    function Parse(text: string, source: string): void {
        Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                ctx!.MakeFamilies(AllDataToReal(results.data as Array<PrefabRaw>), source)
            },
        })
    }

    return (
        <div>
            {/* HEADER */}
            <h1 className='text-center text-xl font-thin'>Prefab Families</h1>

            {/* EXAMPLE URL */}
            <div className='w-full text-center text-sm'>
                <a href={defaultURL} className='text-lime-300 hover:text-lime-100 underline'>
                    download example spreadsheet
                </a>
            </div>

            {/* FILE UPLOAD */}
            <div>
                <div className='pt-2'>
                    <div className='flex'>
                        <label
                            htmlFor='files'
                            className='p-0.5 w-full text-center bg-green-800 px-3 rounded-md active:brightness-125 hover:brightness-110'
                        >
                            Upload CSV or TSV
                        </label>
                        <input
                            id='files'
                            className='hidden'
                            type='file'
                            accept={'.csv, .tsv'}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const files = event.target.files
                                if (!files) return
                                const reader = new FileReader()
                                for (const file of files) {
                                    reader.readAsText(file, 'UTF-8')
                                    reader.onload = ({ target }) => {
                                        const result = target?.result
                                        Parse(result as string, file.name)
                                    }
                                    reader.onerror = () => {
                                        console.warn('error reading file' + file.name)
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className='my-1 text-center'>
                        <em className='text-sm opacity-60'>you can paste a URL into File Explorer!</em>
                    </div>
                </div>

                {families.map((family) => {
                    return (
                        <div className='border-solid-dark border p-2 rounded-md' key={family.id}>
                            <div className='flex gap-3 w-full items-center justify-start flex-nowrap'>
                                {/* ACTIVE BUTTON */}
                                <input
                                    className=' bg-red-50 min-h-6 min-w-6 rounded-none accent-red-500 checked:accent-green-600'
                                    type='checkbox'
                                    checked={family.active}
                                    onChange={(event) => {
                                        ctx?.ToggleFamilyActive(family, event.target.checked)
                                    }}
                                />
                                {/* NAME */}
                                <div className='truncate'>{family.name}</div>
                                {/* DELETE BUTTON */}
                                {!family.unremoveable && (
                                    <button
                                        className='bg-green-800 text-left px-3 rounded-md active:brightness-125 hover:brightness-110 ml-auto'
                                        onClick={(event) => {
                                            ctx?.RemoveFamily(family)
                                        }}
                                    >
                                        remove
                                    </button>
                                )}
                            </div>
                            <div className='text-sm'>source: {family.source}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
