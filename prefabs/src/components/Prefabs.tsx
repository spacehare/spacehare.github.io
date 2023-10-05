import { For, Index, Show, Setter, createEffect, children, Accessor, JSXElement } from 'solid-js'
import Card from './Card'
import styles from '../App.module.sass'
import prefabs from '../assets/brushes.json'
import CopyButton from './CopyButton'
import ButtonGrid from './ButtonGrid'

interface props {
	buttonSignal: Setter<number>,
	searchSignal: Accessor<string>
}

// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
var groupBy = function (xs: Array<any>, key: string) {
	return xs.reduce(function (rv: any, x: any) {
		(rv[x[key]] = rv[x[key]] || []).push(x)
		return rv;
	}, {})
};

const groups: any = groupBy(prefabs.prefabs, 'group')

// https://www.solidjs.com/tutorial/props_children?solved
const SearchableList = (pr: any) => {
	const c: any = children(() => pr.children)
	createEffect(() => {
		for (let item of c()) {
			item.style.display = (item.innerText.toLowerCase().includes(pr.text)
				? 'block'
				: 'none')
		}
	})
	return <>{c()}</>
}

export default (props: props) => {
	return <div class={styles.prefabs}>
		<SearchableList text={props.searchSignal()}>
			<Index each={prefabs.prefabs}>{(prefab, i) =>
				<div>
					<CopyButton
						buttonSignal={props.buttonSignal}
						idx={i}
						text={prefab().name + ''}
					/>
				</div>
			}</Index>
		</SearchableList>
		{/* <For each={Object.entries(groups)}>{(entry: Array<any>) =>
			<Card title={entry[0]} element={<ButtonGrid obj={entry[1]} />} />
		}</For> */}
	</div>

};