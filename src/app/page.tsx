export default function Home() {
	const links = ['prefabs', 'techdc']

	return (
		<div className='flex flex-col gap-4 justify-center items-center min-h-screen bg-emerald-950 text-emerald-100'>
			{links.map((v) => {
				return (
					<a
						href={`./${v}`}
						className='text-8xl p-8 bg-green-900 rounded-md hover:bg-emerald-600 w-1/2'
						key={v}
					>
						{v}
					</a>
				)
			})}
		</div>
	)
}
