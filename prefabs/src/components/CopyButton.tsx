import { For, Index, Show, Setter, createEffect } from 'solid-js'
import styles from '../App.module.sass';


interface props {
	text: string,
	idx: number,
	buttonSignal: Setter<number>
}



export default (props: props) => {
	return <button class={styles.CopyButton} onclick={() => props.buttonSignal(props.idx)}>{props.text}</button>
}
