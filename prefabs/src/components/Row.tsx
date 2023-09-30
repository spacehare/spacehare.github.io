// ex input: compiled['45 bend']

import { For } from 'solid-js'
import Card from './Card'
import styles from '../App.module.scss'

interface props {
	obj: object
}

export default (props: props) => {
	return <div class={styles.alt_display}>
		<For each={Object.values(props.obj)}>{(arg: any) =>
			<Card obj={arg} />
		}</For>
	</div >
};

