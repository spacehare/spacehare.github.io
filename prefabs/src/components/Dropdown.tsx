import styles from '../App.module.sass';
import { Accessor, For, Setter } from 'solid-js'

interface props {
	label: string,
	items: Array<string>
	getter: Accessor<string>,
	setter: Setter<string>
}

export default (props: props) => {
	return (
		<>
			<div>{props.label}</div>
			<select value={props.getter()} onChange={e => { props.setter(e.currentTarget.value) }}>
				<For each={props.items}>{(item: any) =>
					<option value={item} textContent={item} />
				}</For>
			</select>
		</>
	)
}