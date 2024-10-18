'use client'

import prefabsData from '@/app/assets/prefabs/prefabs.json'
import CopyButton from '../components/CopyButton'
import SidebarMdx from './sidebar.mdx'
import { useState } from 'react'
import DropDown from '../components/DropDown'
import Wad from '@/app/assets/prefabs/wad.json'

export default function Page() {
	const [search, setSearch] = useState('')
	const [searchRegex, setSearchRegex] = useState(false)
	const [viewMode, setViewMode] = useState(true)
	const [viewSidebar, setViewSidebar] = useState(true)
	const [trimColor, setTrimColor] = useState(
		localStorage.getItem('trim_color') || Wad.default.trim.color
	)
	const [trimStyle, setTrimStyle] = useState(
		localStorage.getItem('trim_style') || Wad.default.trim.style
	)
	const [prototypeColor, setPrototypeColor] = useState(
		localStorage.getItem('prototype_color') || Wad.default.prototype.color
	)

	const uniqueGroups = Array.from(
		new Map(
			prefabsData.map((v) => [v.group, { group: v.group, img: v.img }])
		).values()
	)

	const searchMatch = (val: string) => {
		if (searchRegex) {
			return val.match(search)
		} else {
			const a = val.toLowerCase()
			const b = search.toLowerCase()
			return a.includes(b)
		}
	}

	const sendPrefab = (data: string) => {
		const output: string = JSON.parse(data)
			.replaceAll(Wad.default.trim.color, trimColor)
			.replaceAll(Wad.default.trim.style, trimStyle)
			.replaceAll(Wad.default.prototype.color, prototypeColor)
			.replaceAll('@@@_REPLACE_ME_@@@', Date.now().toString())
			.replaceAll('__TB_empty', `128_${prototypeColor}_3`)

		navigator.clipboard.writeText(output)
	}

	return (
		// PAGE
		<div className='flex gap-2 p-2 justify-between items-start bg-solid-med min-h-screen font-normal'>
			{/* FULL SIDEBAR */}
			<div className='flex flex-col gap-3 sticky top-2'>
				{/* SIDEBAR TOGGLE BUTTON*/}
				<button
					className='bg-green-800 p-1 w-full text-center px-3 rounded-md active:brightness-125 hover:brightness-110 uppercase'
					onClick={() => {
						setViewSidebar(!viewSidebar)
					}}
				>
					{viewSidebar ? 'toggle sidebar' : '+'}
				</button>
				{/* SIDEBAR CONTENTS */}
				<div
					className={`w-72 bg-solid-light h-fit p-3 flex flex-col gap-4 rounded-md rounded-bl-3xl text-lime-100 ${
						!viewSidebar && 'hidden'
					}`}
				>
					{/* SEARCH */}
					<div className='flex gap-2'>
						<input
							type='text'
							placeholder='Search'
							onKeyUp={(e) => setSearch(e.currentTarget.value)}
							autoFocus
							className='bg-solid-dark text-lime-200 outline-none px-2 py-1 rounded-md placeholder:text-lime-200/50 w-full'
						/>
						<button
							className={`${
								searchRegex ? 'bg-green-600' : 'bg-green-800'
							} p-1 w-min text-center px-3 rounded-md hover:brightness-110 uppercase`}
							onClick={() => {
								setSearchRegex(!searchRegex)
							}}
							title='Regular Expression match'
						>
							.*
						</button>
					</div>
					{/* VIEW MODE */}
					<button
						className='bg-green-800 p-1 w-full text-left px-3 rounded-md active:brightness-125 hover:brightness-110 capitalize'
						onClick={() => {
							setViewMode(!viewMode)
						}}
					>
						{'current view mode: ' + (viewMode ? 'group' : 'individual')}
					</button>
					{/* SORT MODE */}
					{/* TODO LOL */}
					{/* DROPDOWNS */}
					<h1 className='text-center text-xl font-thin capitalize'>
						export options
					</h1>
					<div className='gap-2 flex flex-col'>
						<DropDown
							getter={trimColor}
							setter={setTrimColor}
							label='Trim Color'
							items={Wad.trim.color}
							storageKey='trim_color'
							className='flex gap-2'
						/>
						<DropDown
							getter={trimStyle}
							setter={setTrimStyle}
							label='Trim Style'
							items={Wad.trim.style}
							storageKey='trim_style'
							className='flex gap-2'
						/>
						<DropDown
							getter={prototypeColor}
							setter={setPrototypeColor}
							label='Prototype Color'
							items={Wad.prototype.color}
							storageKey='prototype_color'
							className='flex gap-2'
						/>
					</div>
					{/* HOW TO */}
					<div className='font-atkinson flex flex-col gap-3'>
						<h1 className='text-2xl text-center font-thin font-atkinson uppercase '>
							how to use
						</h1>
						<SidebarMdx />
					</div>
				</div>
			</div>

			{/* PREFABS */}
			<div className='w-full'>
				{viewMode ? (
					// GROUP
					<div className='flex flex-wrap gap-1.5'>
						{Object.values(uniqueGroups).map((v) => {
							return (
								// CARD
								searchMatch(v.group) && (
									<div
										key={v.group}
										className='bg-solid-dark
									p-1.5 w-48 h-72 justify-between flex flex-col rounded-md rounded-tr-3xl'
									>
										<div className='text-center text-xl'>{v.group}</div>
										{v.img && (
											<img
												src={`img/${v.img}`}
												className='h-32 w-32 m-auto p-1'
											/>
										)}
										<div className='flex flex-wrap gap-1.5'>
											{prefabsData.map((p) => {
												if (p.group === v.group) {
													return (
														<CopyButton
															obj={p}
															callback={sendPrefab}
															className='p-0.5 flex-grow w-16 min-w-16 rounded-md font-medium
														 '
															key={p.dif}
														/>
													)
												}
											})}
										</div>
									</div>
								)
							)
						})}
					</div>
				) : (
					// INDIVIDUAL
					<div className='flex flex-wrap gap-2'>
						{prefabsData.map((v) => {
							return (
								// CARD
								searchMatch(v.group + v.dif) && (
									<div
										className='p-1 bg-solid-dark h-10 w-64 justify-between flex rounded-md gap-2 text-lg truncate'
										key={v.group + v.dif}
									>
										{v.img && (
											<img
												src={`img/${v.img}`}
												height={'32px'}
												width={'32px'}
												className='p-0.5'
											/>
										)}
										<CopyButton
											text={v.group + (v.dif && ' — ' + v.dif)}
											obj={v}
											callback={sendPrefab}
											className='w-full truncate rounded-md'
											key={v.group + v.dif}
										/>
									</div>
								)
							)
						})}
					</div>
				)}
			</div>
		</div>
	)
}

// --------------------------------------------

// async function generateStaticParams() {
// 	const files = (await getStaticProps()).prefabs
// }

// const getStaticProps = async () => {
// 	const dir = path.join(process.cwd(), 'src', 'app', 'assets', 'prefabs')
// 	const files = fs.readdirSync(dir)

// 	return {
// 		files,
// 	}
// }

// const getStaticProps = async () => {
// 	const prefabs = prefabsData

// 	return {
// 		prefabs,
// 	}
// }
