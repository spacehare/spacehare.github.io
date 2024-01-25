import { Show } from 'solid-js'

interface props {
	img: string
	grid?: string
}

export default (props: props) => {
	return (
		<>
			<img src={props.img}></img>
			<Show when={props.grid && true}>
				<img src={props.grid} class='gridlines'></img>
			</Show>
		</>
	)
}
