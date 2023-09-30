import ButtonGrid from './ButtonGrid'
import BrushPreview from './BrushPreview'
import * as svgs from '../assets/svg/45 bend.svg'
import { For } from 'solid-js'
import styles from '../App.module.scss';

// populate by saying "czg 12 circle"
// get proper SVG, grid, and buttons
// 64, 128, 256, etc

interface props {
	obj: any
}

export default (props: props) => {
	return <div class={styles.alt_display}>
		<img src={`src/assets/svg/${props.obj.svg}.svg`} />
		<img src={`src/assets/svg/grid ${props.obj.grid}.svg`} class={styles.gridlines} />
		<ButtonGrid obj={props.obj} />
	</div>
}