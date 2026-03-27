import Content from './Content'
import { PrefabProvider } from './prefabContext'

export default function Page() {
    const defaultPrefabsURL: any = process.env.default_prefabs_url

    return (
        <PrefabProvider>
            <Content defaultPrefabsURL={defaultPrefabsURL} />
        </PrefabProvider>
    )
}
