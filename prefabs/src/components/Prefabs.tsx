import { For, Index, Show, Setter, createEffect, children, Accessor, JSXElement } from 'solid-js'
import Card from './Card'
import styles from '../App.module.sass'
import prefabs from '../assets/prefabs.json'
import CopyButton from './CopyButton'
import ButtonGrid from './ButtonGrid'

interface props {
	searchSignal: Accessor<string>
}

export default (props: props) => {

	return <div class={styles.prefabs}>
		<For each={Object.entries(prefabs)}>{(group: any) =>
			<Show when={group[0].toLowerCase().includes(props.searchSignal())}>
				<Card image={group[1].image ? `./src/assets/${group[1].image}` : ''} title={group[0]}>
					<span>{group[1].note}</span>
					<For each={Object.values(group[1].prefabs ?? '')}>{(brush: any) =>
						<CopyButton text={brush.dif} data={brush.brush}></CopyButton>
					}</For>
				</Card>
			</Show>
		}</For>
	</div>
};