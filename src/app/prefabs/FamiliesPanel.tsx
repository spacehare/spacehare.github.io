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
            <h1 className='text-center text-xl font-thin'>FAMILIES</h1>
            <div>
                {/* FILE UPLOAD */}
                <div className='p-3'>
                    <input
                        type='file'
                        accept={'.csv, .tsv'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const files = e.target.files
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
                    <div className='mt-2 text-center'>
                        <em className='text-sm opacity-60'>you can paste a URL into File Explorer!</em>
                    </div>
                </div>

                {families.map((family) => {
                    return (
                        <div className='border-solid-dark border p-2 rounded-md' key={family.id}>
                            <div className='flex gap-3 w-full items-center justify-start flex-nowrap'>
                                <input
                                    className=' bg-red-50 min-h-6 min-w-6 rounded-none accent-red-500 checked:accent-green-600'
                                    type='checkbox'
                                    checked={family.active}
                                    onChange={(e) => {
                                        !ctx?.ToggleFamilyActive(family, e.target.checked)
                                    }}
                                />
                                <div className='truncate'>{family.name}</div>
                                <button
                                    className='bg-green-800 py-1 text-left px-3 rounded-md active:brightness-125 hover:brightness-110 ml-auto'
                                    onClick={(e) => {
                                        ctx?.RemoveFamily(family)
                                    }}
                                >
                                    remove
                                </button>
                            </div>
                            <div>{family.source}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
