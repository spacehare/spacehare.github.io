import { createSignal, createContext, useContext } from 'solid-js'

type PrefabStore = any // [Accessor<string | null>, Setter<string | null>]

const PrefabContext = createContext<PrefabStore>()

export function PrefabProvider(props: any) {
	const [prefabToBeCopied, setprefabToBeCopied] = createSignal<string | null>(
			null
		),
		counter: PrefabStore = [prefabToBeCopied, setprefabToBeCopied]

	return (
		<PrefabContext.Provider value={counter}>
			{props.children}
		</PrefabContext.Provider>
	)
}

export function usePrefab() {
	return useContext(PrefabContext)
}
