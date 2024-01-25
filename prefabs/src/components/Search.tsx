import { useContext } from 'solid-js'
import styles from '../App.module.sass'
import { SearchContext } from './SearchContext'

export const searchMatch = (value: String) => {
	const [search] = useContext(SearchContext)

	let a = value.toLowerCase()
	let b = search().toLowerCase()
	return a.includes(b)
}

export const Search = () => {
	const [, setSearch] = useContext(SearchContext)
	return (
		<input
			placeholder='Search'
			class={styles.Search}
			onKeyUp={(e) => setSearch(e.currentTarget.value)}
			autofocus
		/>
	)
}
