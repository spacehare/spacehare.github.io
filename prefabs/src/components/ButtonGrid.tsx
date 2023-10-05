import { For } from 'solid-js'
import ButtonCopy from "./CopyButton"
import BrushPreview from "./BrushPreview"
import styles from '../App.module.sass';


interface props {
	obj: any
}

export default (props: props) => {
	return <div class={styles.button_grid}>
		<For each={props.obj}>{(entry: any) =>
			<ButtonCopy text={entry.dif} what={entry.brush} />
		}</For>
	</div >
}
