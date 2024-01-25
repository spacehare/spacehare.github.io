import { useContext } from 'solid-js'
import { ViewContext, sortModes } from './ViewContext'
import { Prefab } from '../types/Prefab'

export const fetchJson = async (file: string) =>
	(await fetch(`/${file}.json`)).json()

export const fetchMap = async (file: string) =>
	(await fetch(`/map/${file}.txt`)).text()

// export const fileFormat = (fileName: string) => `map/${fileName}.txt`

export const sorted = (target: Array<any>, sortingSignal: any) => {
	switch (sortingSignal) {
		case sortModes.Default:
			return target
		case sortModes.Name:
			return target.toSorted((a: Prefab, b: Prefab) =>
				a.name[0].localeCompare(b.name[0], undefined, { numeric: true })
			)
	}
}
