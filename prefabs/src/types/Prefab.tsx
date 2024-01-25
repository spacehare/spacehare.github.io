export type Prefab = {
	name: Array<string>
	image: string
	tags: Array<string>
	credit: Array<string>
	meta: Object
	uploader: string
	file: string
	group: string
	id: number
}

export const getCredit = (prefab: Prefab) => prefab.credit.join(', ')
export const getDiscriminator = (prefab: Prefab) =>
	prefab.name[1] ?? prefab.name[0]
