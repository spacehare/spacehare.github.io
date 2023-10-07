import ButtonGrid from './ButtonGrid'
import BrushPreview from './BrushPreview'
import * as svgs from '../assets/svg/45 bend.svg'
import { For, JSXElement, children, Show } from 'solid-js'
import styles from '../App.module.sass';
import ButtonCopy from './CopyButton';

interface props {
	title: string,
	children?: any,
	image?: string,
}

export default (props: props) => {
	const c = children(() => props.children)
	return <div class={styles.card}>
		<div class={styles.cardTitle}>{props.title}</div>
		<Show when={props.image}>
			<img src={props.image} />
		</Show>
		<div class={styles.Buttons}>{c()}</div>
	</div>
}