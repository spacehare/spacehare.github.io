import styles from '../App.module.scss';
import { For } from 'solid-js'

interface props {
	default: string
	id: string
	name: string
	items: Array<string>
}

export default (props: props) => {
	return <div>
		<select id={props.id} name={props.name}>
			<For each={props.items}>{(item: any) =>
				<option value={item} textContent={item} />
			}</For>
		</select>
	</div>
}