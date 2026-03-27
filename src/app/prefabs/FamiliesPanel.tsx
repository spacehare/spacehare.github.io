import { useContext } from 'react'
import { PrefabContext } from './prefabContext'
import { Prefab } from './types/Prefab'
import { PrefabFamily } from './types/PrefabFamily'

type props = {
    families: PrefabFamily[]
}

export function FamiliesPanel(props: props) {
    const ctx = useContext(PrefabContext)

    return (
        <div>
            <h1 className='text-center text-xl font-thin'>FAMILIES</h1>
            <div>
                {props.families.map((family) => {
                    return (
                        <div className='border-solid-dark border p-2 rounded-md' key={family.id}>
                            <div className='flex gap-3'>
                                <input
                                    type='checkbox'
                                    checked={family.active}
                                    onChange={(e) => {
                                        !ctx?.ToggleFamilyActive(family, e.target.checked)
                                    }}
                                ></input>
                                <div>{family.name}</div>
                            </div>
                            <div>{family.source}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
