import { PrefabRaw } from './PrefabRaw'

export type Prefab = Omit<PrefabRaw, 'entity_string_json' | 'credit_json_array'> & {
    entity_string: string
    credit: string[]
}
