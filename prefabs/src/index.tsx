/* @refresh reload */
import { render } from 'solid-js/web'
import { PrefabProvider } from './components/PrefabProvider'
import { SearchContext } from './components/SearchContext'
import { ViewContext, sortModes, viewModes } from './components/ViewContext'

import './index.scss'
import App from './App'
import { createSignal } from 'solid-js'
// import { Route, Router, useSearchParams } from '@solidjs/router'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?'
	)
}

const [search, setSearch] = createSignal('')
const [view, setView] = createSignal(viewModes.Group)
const [sort, setSort] = createSignal(sortModes.Default)
// const [params, setParams] = useSearchParams()

render(
	() => (
		<ViewContext.Provider
			value={{ viewValue: [view, setView], sortValue: [sort, setSort] }}
		>
			<SearchContext.Provider value={[search, setSearch]}>
				<PrefabProvider>
					<App />
					{/* <Router>
						<Route path={'/prefabs'} component={App} />
					</Router> */}
				</PrefabProvider>
			</SearchContext.Provider>
		</ViewContext.Provider>
	),
	root!
)
