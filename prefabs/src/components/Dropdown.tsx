import { Accessor, For, Setter } from 'solid-js'
import styles from '../App.module.sass'

interface props {
	label: string
	items: Array<string>
	getter: Accessor<string>
	setter: Setter<string>
}

export default (props: props) => {
	return (
		<div class={styles.dropdown}>
			<div>{props.label}</div>
			<select
				value={props.getter()}
				onChange={(e) => {
					props.setter(e.currentTarget.value)
				}}
			>
				<For each={props.items}>
					{(item: any) => <option value={item} textContent={item} />}
				</For>
			</select>
		</div>
	)
}
