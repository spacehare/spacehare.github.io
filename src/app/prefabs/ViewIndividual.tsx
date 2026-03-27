import { useContext } from 'react'
import CopyButton from '../components/CopyButton'
import { PrefabContext } from './prefabContext'
import { Prefab } from './types/Prefab'

type props = {
    allPrefabs: Prefab[]
    SendPrefab: (data: string) => void
    SearchMatch: (data: string) => any
}

export const IndividualView = ({ allPrefabs, SendPrefab, SearchMatch }: props) => {
    return (
        <div className='flex flex-wrap gap-2'>
            {allPrefabs.map((prefab: Prefab) => {
                return (
                    // CARD
                    SearchMatch(prefab.group + prefab.dif) && (
                        <div
                            className='p-1 bg-solid-dark h-10 w-64 justify-between flex rounded-md gap-2 text-lg truncate'
                            key={prefab.family + prefab.group + prefab.dif}
                        >
                            {prefab.img_url && (
                                <img src={`${prefab.img_url}`} height={'32px'} width={'32px'} className='p-0.5' />
                            )}
                            <CopyButton
                                text={prefab.group + (prefab.dif && ' — ' + prefab.dif)}
                                prefab={prefab}
                                callback={SendPrefab}
                                className='w-full truncate rounded-md'
                                key={prefab.family + prefab.group + prefab.dif}
                            />
                        </div>
                    )
                )
            })}
        </div>
    )
}
