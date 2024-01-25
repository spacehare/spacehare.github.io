import { Show } from 'solid-js'
import CopyButton from './CopyButton'
import { Prefab } from '../types/Prefab'
import styles from '../App.module.sass'

interface props {
	prefab: Prefab
}

export default (props: props) => (
	<div
		class={styles.individual}
		style={{
			'justify-content': props.prefab.image ? 'space-between' : 'flex-end',
		}}
	>
		<Show when={props.prefab.image}>
			<img src={`/${props.prefab.image}`} height='32px' width='32px' />
		</Show>
		<CopyButton text={props.prefab.name[0]} fileName={props.prefab.file} />
	</div>
)
