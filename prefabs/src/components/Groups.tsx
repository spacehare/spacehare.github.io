import { For, Show, createResource, useContext } from 'solid-js'
import { fetchJson, sorted } from './Common'
import { GroupClassic } from './GroupClassic'
import { searchMatch } from './Search'
import { Prefab } from '../types/Prefab'
import { ViewContext } from './ViewContext'

interface props {
	source: any
}

export default (props: props) => {
	const [groups] = createResource('groups', fetchJson)
	const { viewValue, sortValue } = useContext(ViewContext)
	const [sort, setSort] = sortValue

	const orphans = () => {
		const Ids: Array<number> = []
		for (let group of groups()) {
			Ids.push(...group.children)
		}
		// turn orphan prefabs into 1-item groups
		return props.source
			.filter((prefab: Prefab) => !Ids.includes(prefab.id))
			.map((prefab: Prefab) => {
				return {
					name: prefab.name[0],
					image: prefab.image,
					children: [prefab.id],
				}
			})
	}

	return (
		<>
			<Show when={!groups.loading}>
				<For each={sorted(groups().concat(orphans()), sort())}>
					{(group: any) => (
						<Show when={searchMatch(group.name)}>
							<GroupClassic source={props.source} group={group} />
						</Show>
					)}
				</For>
			</Show>
		</>
	)
}
