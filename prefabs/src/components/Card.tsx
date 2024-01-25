import { children, Show } from 'solid-js'
import styles from '../App.module.sass'

interface props {
	title: string
	children?: any
	image?: string
}

export default (props: props) => {
	const c = children(() => props.children)
	return (
		<div class={styles.card}>
			<div class={styles.cardTitle}>{props.title}</div>
			<Show when={props.image}>
				<img
					src={props.image}
					class={props.image?.endsWith('.svg') ? styles.brushSvg : ''}
				/>
			</Show>
			<div style={{ 'margin-top': 'auto' }}>{c()}</div>
		</div>
	)
}
