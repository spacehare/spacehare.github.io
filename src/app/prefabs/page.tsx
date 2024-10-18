'use client'

import prefabsData from '@/app/assets/prefabs/prefabs.json'
import CopyButton from '../components/CopyButton'
import Sidebar from './sidebar.mdx'
import { useState } from 'react'
import DropDown from '../components/DropDown'

export default function Page() {
	const [viewMode, setViewMode] = useState(true)
	const [trimColor, setTrimColor] = useState('DEF 1')
	const [trimStyle, setTrimStyle] = useState('DEF 2')
	const [prototypeColor, setPrototypeColor] = useState('DEF 3')

	const uniqueGroups = Array.from(
		new Map(
			prefabsData.map((v) => [v.group, { group: v.group, img: v.img }])
		).values()
	)

	return (
		<div className='flex gap-2 p-2 justify-between items-start bg-green-900 bg-gradient-to-t from-blue-900 to-cyan-600 min-h-screen'>
			{/* SIDEBAR */}
			<div className='min-w-64 max-w-64 bg-emerald-950/30 sticky h-fit top-2 p-4 flex flex-col gap-4 rounded-lg font-roboto text-lime-100'>
				{/* SEARCH */}
				<div>SEARCH</div>
				{/* VIEW MODE */}
				<button
					className='bg-sky-500 p-1 w-full text-left'
					onClick={() => {
						setViewMode(!viewMode)
					}}
				>
					{'current view mode: ' + (viewMode ? 'group' : 'individual')}
				</button>
				{/* SORT MODE */}
				{/* TODO LOL */}

				{/* DROPDOWNS */}
				<div className='gap-2 flex flex-col'>
					<DropDown
						getter={trimColor}
						setter={setTrimColor}
						label='Trim Color'
						items={['wawa', 'owoo']}
						className='flex gap-2'
					/>
					<DropDown
						getter={trimStyle}
						setter={setTrimStyle}
						label='Trim Style'
						items={[]}
						className='flex gap-2'
					/>
					<DropDown
						getter={prototypeColor}
						setter={setPrototypeColor}
						label='Prototype Color'
						items={[]}
						className='flex gap-2'
					/>
				</div>

				{/* HOW TO */}
				<h1 className='text-2xl text-center'>HOW TO USE</h1>
				<div className='font-atkinson flex flex-col gap-3'>
					<Sidebar />
				</div>
			</div>

			{viewMode ? (
				// GROUP
				<div className='flex flex-wrap gap-1.5 '>
					{Object.values(uniqueGroups).map((v) => {
						return (
							// CARD
							<div
								key={v.group}
								className='bg-emerald-950/50 p-1 w-56 h-56 justify-between flex flex-col rounded-md rounded-tr-[48px]'
							>
								<div className='text-center text-xl'>{v.group}</div>
								{v.img && (
									<img src={`img/${v.img}`} className='p-2 h-32 w-32 m-auto' />
								)}
								<div className='flex flex-wrap gap-1'>
									{prefabsData.map((p) => {
										if (p.group === v.group) {
											return (
												<CopyButton
													obj={p}
													className='bg-lime-600/50 select-none p-0.5 flex-grow w-16 min-w-16 rounded-md hover:bg-green-600 active:bg-lime-400 active:scale-90 transition duration-200'
													key={p.dif}
												/>
											)
										}
									})}
								</div>
							</div>
						)
					})}
				</div>
			) : (
				// INDIVIDUAL
				<div className='flex flex-wrap gap-2'>
					{prefabsData.map((v) => {
						return (
							// CARD
							<div
								className='p-1 bg-emerald-950 h-10 w-64 justify-between flex rounded-sm gap-2'
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
									className='bg-emerald-800 w-full select-none hover:bg-emerald-700'
									key={v.group + v.dif}
								/>
							</div>
						)
					})}
				</div>
			)}
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
