import ButtonGrid from './ButtonGrid'
import BrushPreview from './BrushPreview'
import * as svgs from '../assets/svg/45 bend.svg'
import { For, JSXElement } from 'solid-js'
import styles from '../App.module.sass';
import ButtonCopy from './CopyButton';

interface props {
	title: string,
	element: JSXElement
	img?: any
}

export default (props: props) => {
	return <div class={styles.card}>
		<img src={props.img} />
		<div>{props.title}</div>
		<div>{props.element}</div>
		{/* <img src={`src/assets/svg/${props.fab.svg}.svg`} /> */}
		{/* <img src={`src/assets/svg/grid ${props.fab.grid}.svg`} class={styles.gridlines} /> */}
	</div>
}