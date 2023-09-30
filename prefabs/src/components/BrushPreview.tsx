import "../assets/svg"
import { Show } from "solid-js"

interface props {
	brushSVG: string
}

export default (props: props) => {
	return (
		<>
			<img src={props.brushSVG}></img>
			<Show when={true}>
				<img src={props.svgGrid} class="gridlines"></img>
			</Show>
		</>
	)
}
