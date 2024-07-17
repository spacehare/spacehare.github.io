import {
	For,
	Show,
	createResource,
	Switch,
	Match,
	useContext,
	Suspense,
} from 'solid-js'
import styles from '../App.module.sass'
import { searchMatch } from './Search'
import { fetchJson, sorted } from './Common'
import Groups from './Groups'
import { ViewContext, viewModes } from './ViewContext'
import IndividualPrefab from './IndividualPrefab'

export default () => {
	const [prefabsJson] = createResource(() => fetchJson('prefabs'))
	const { viewValue, sortValue } = useContext(ViewContext)
	const [view, setView] = viewValue
	const [sort, setSort] = sortValue

	return (
		<div class={styles.prefabs}>
			<Suspense>
				<Show when={!prefabsJson.loading} fallback={<div>LOADING...</div>}>
					<Switch>
						<Match when={view() === viewModes.Group}>
							<Groups source={prefabsJson()} />
						</Match>
						<Match when={view() === viewModes.Individual}>
							<For each={sorted(prefabsJson(), sort())}>
								{(prefab) => (
									<Show when={searchMatch(prefab.name[0])}>
										<IndividualPrefab prefab={prefab} />
									</Show>
								)}
							</For>
						</Match>
					</Switch>
				</Show>
			</Suspense>
		</div>
	)
}
