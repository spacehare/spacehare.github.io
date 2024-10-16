import fs from 'fs'
import path from 'path'
import prefabsData from '@/app/assets/prefabs/prefabs.json'
import CopyButton from '../components/CopyButton'

export default async function Page() {
	const uniqueGroups = Array.from(
		new Map(
			prefabsData.map((v) => [v.group, { group: v.group, img: v.img }])
		).values()
	)

	return (
		<div className='flex gap-2 p-4 bg-blue-500'>
			{/* SIDEBAR */}
			<div className='min-w-80 bg-cyan-700 sticky h-fit top-4'>SIDEBAR</div>

			{/* GROUP */}
			<div className='flex flex-wrap gap-2'>
				{Object.values(uniqueGroups).map((v) => {
					return (
						// CARD
						<div
							key={v.group}
							className='bg-slate-800 p-1 min-h-40 w-32 justify-between flex flex-col rounded-sm'
						>
							<div className='text-center'>{v.group}</div>
							{v.img && <img src={`img/${v.img}`} className='p-2'></img>}
							<div className='flex flex-wrap gap-1'>
								{prefabsData.map((p) => {
									if (p.group === v.group) {
										return (
											<CopyButton
												obj={p}
												className='bg-blue-600 select-none py-0.5 flex-grow w-10 rounded-sm hover:bg-blue-400'
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

			{/* INDIVIDUAL */}
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
								></img>
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
		</div>
	)
}

function copy(text: string) {
	navigator.clipboard.writeText(text)
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
