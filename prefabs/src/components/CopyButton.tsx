import styles from '../App.module.sass'
import { usePrefab } from './PrefabProvider'

interface props {
	text: string
	fileName: any
}

export default (props: props) => {
	const [prefabToBeCopied, setprefabToBeCopied] = usePrefab()
	return (
		<button
			class={styles.CopyButton}
			onclick={() => setprefabToBeCopied(props.fileName)}
		>
			<span>{props.text}</span>
		</button>
	)
}
