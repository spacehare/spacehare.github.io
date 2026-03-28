import Image from 'next/image'
import CopyButton from '../components/CopyButton'
import { Prefab } from './types/Prefab'
import { PrefabFamily } from './types/PrefabFamily'

type props = {
    prefabs: Prefab[]
    SendPrefab: (data: string) => void
    SearchMatch: (data: string) => any
}

export default function GroupView({ prefabs, SendPrefab, SearchMatch }: props) {
    type GroupCreditProps = {
        uGroup: { group: string }
    }

    // FIXME
    // there is some kind of behavior like...
    // if a prefab shares a group name, it will merge to another group within a different family!
    // TODO
    // turn this into a method
    const uniqueGroups = Array.from(
        new Map(prefabs.map((prefab: Prefab) => [prefab.group, { group: prefab.group, img: prefab.img_url }])).values(),
    )

    const GroupCredit = ({ uGroup }: GroupCreditProps) => {
        const l = []
        return prefabs.map((pre: Prefab) => {
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

    return (
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
                                    {prefabs.map((pre: Prefab) => {
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
}
