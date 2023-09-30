import { For } from 'solid-js'
import ButtonCopy from "./ButtonCopy"
import BrushPreview from "./BrushPreview"
import styles from '../App.module.scss';


interface props {
	obj: any
}

export default (props: props) => {
	return <div class={styles.button_grid}>
		<For each={Object.entries(props.obj.objects)}>{(arg: any) =>
			<ButtonCopy obj={arg}></ButtonCopy>
		}</For>
	</div >
}
