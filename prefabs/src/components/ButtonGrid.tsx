import { For } from 'solid-js'
import CopyButton from './CopyButton'
import styles from '../App.module.sass'

interface props {
	obj: any
}

export default (props: props) => {
	return (
		<div class={styles.button_grid}>
			<For each={props.obj}>
				{(entry: any) => <CopyButton text={entry.dif} fileName={entry.brush} />}
			</For>
		</div>
	)
}
