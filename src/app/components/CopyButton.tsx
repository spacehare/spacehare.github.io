'use client'

import { Prefab } from '../prefabs/types/Prefab'

type Props = {
    text?: string
    prefab: Prefab
    callback: (data: string) => void
    className: string
}

export default function CopyButton({ text, prefab: obj, callback, className }: Props) {
    const label = text || obj.dif || '-'
    return (
        <button
            className={`${className} select-none bg-solid-light hover:brightness-150 active:brightness-200 active:scale-90 transition duration-100`}
            key={obj.dif}
            title={label}
            onMouseDown={() => {
                callback(obj.entity_string)
            }}
        >
            {label}
        </button>
    )
}
