import type { Component } from 'solid-js'
import {
	createSignal,
	createEffect,
	createResource,
	useContext,
} from 'solid-js'
import { usePrefab } from './components/PrefabProvider'
import wad from '../src/assets/wad.json'
import styles from './App.module.sass'
import DropDown from './components/Dropdown'
import Prefabs from './components/Prefabs'
import { ReadMe, readMeText } from './components/ReadMe'
import { Search } from './components/Search'
import { fetchMap } from './components/Common'
import { ViewContext, viewModes, sortModes } from './components/ViewContext'

const App: Component = () => {
	const [trimStyle, setTrimStyle] = createSignal<string>(wad.default.trim.style)
	const [trimColor, setTrimColor] = createSignal<string>(wad.default.trim.color)
	const [prototypeColor, setPrototypeColor] = createSignal<string>(
		wad.default.prototype
	)
	const [prefabToBeCopied, setPrefabToBeCopied] = usePrefab()
	const { viewValue, sortValue } = useContext(ViewContext)
	const [view, setView] = viewValue
	const [sort, setSort] = sortValue

	createEffect(() => {
		if (prefabToBeCopied()) {
			fetchMap(prefabToBeCopied()).then((fileContents: string) => {
				let output: string = fileContents
					.replaceAll(wad.default.trim.style, trimStyle())
					.replaceAll(wad.default.trim.color, trimColor())
					.replaceAll(wad.default.prototype, prototypeColor())
					.replaceAll('@@@_REPLACE_ME_@@@', Date.now().toString())

				navigator.clipboard.writeText(output)
				setPrefabToBeCopied(null)
			})
		}
	})

	return (
		<div class={styles.App}>
			<div class={styles.sidebar}>
				<Search />
				<div class={styles.dropdowns}>
					<DropDown
						label='View Mode'
						items={Object.values(viewModes)}
						getter={view}
						setter={setView}
					/>
					<DropDown
						label='Sort Mode'
						items={Object.values(sortModes)}
						getter={sort}
						setter={setSort}
					/>
					<div style={{ 'text-align': 'center' }}>- Export Options -</div>
					<DropDown
						label='Trim Color'
						items={wad.trim.color}
						getter={trimColor}
						setter={setTrimColor}
					/>
					<DropDown
						label='Trim Style'
						items={wad.trim.style}
						getter={trimStyle}
						setter={setTrimStyle}
					/>
					<DropDown
						label='Prototype'
						items={wad.prototype}
						getter={prototypeColor}
						setter={setPrototypeColor}
					/>
				</div>
				<ReadMe />
				<div class={styles.bottomLinks}>
					Resources:
					<a href='https://web.archive.org/web/20230121043915/http://khreathor.xyz/site/prototype/'>
						Prototype textures by Khreathor
					</a>
					<a href='https://cdn.discordapp.com/attachments/1017318141480665088/1018287700962451476/makkon_trim_guide.wad'>
						Makkon trim textures by Kebby_
					</a>
					Technical:
					<a href='https://developer.valvesoftware.com/wiki/MAP_file_format'>
						Valve MAP file format
					</a>
				</div>
				<div
					style={{
						'text-align': 'center',
						'margin-top': 'auto',
					}}
				>
					🐇
				</div>
			</div>
			<Prefabs />
		</div>
	)
}

export default App
