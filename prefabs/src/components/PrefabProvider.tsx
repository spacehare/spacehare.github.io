import { createSignal, createContext, useContext, Accessor, Setter } from "solid-js";

type PrefabStore = any // [Accessor<string | null>, Setter<string | null>]

const PrefabContext = createContext<PrefabStore>();

export function PrefabProvider(props: any) {
	const [desiredPrefab, setDesiredPrefab] = createSignal<string | null>(null),
		counter: PrefabStore = [
			desiredPrefab,
			setDesiredPrefab
		]

	return (
		<PrefabContext.Provider value={counter}>
			{props.children}
		</PrefabContext.Provider>
	);
}

export function usePrefab() {
	return useContext(PrefabContext)
}