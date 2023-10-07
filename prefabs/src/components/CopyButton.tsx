import styles from '../App.module.sass';
import { usePrefab } from './PrefabProvider';


interface props {
	text: string,
	data: any,
}


export default (props: props) => {
	const [desiredPrefab, setDesiredPrefab] = usePrefab()
	return <button class={styles.CopyButton} onclick={() => setDesiredPrefab(props.data)}>
		<span>{props.text}</span>
	</button>
}
