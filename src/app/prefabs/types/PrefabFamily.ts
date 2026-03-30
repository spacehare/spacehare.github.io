import { Prefab } from './Prefab'

export type PrefabFamily = {
    active: boolean
    name: string
    source: string
    prefabs: Prefab[]
    id: number
    unremoveable?: boolean
}
