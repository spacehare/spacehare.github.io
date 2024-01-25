import { Show } from 'solid-js'
import { getCredit, Prefab } from '../types/Prefab'

interface props {
	prefab: Prefab
}

export const PrefabCredit = (props: props) => {
	return (
		<Show when={props.prefab.credit.length}>
			<div>by {getCredit(props.prefab)}</div>
		</Show>
	)
}
