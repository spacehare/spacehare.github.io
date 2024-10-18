export default function Home() {
	const links = ['prefabs', 'techdc']

	return (
		<div className='flex flex-col gap-4 justify-center items-center min-h-screen bg-emerald-950 text-lime-200'>
			{links.map((v) => {
				return (
					<a
						href={`./${v}`}
						className='text-8xl p-8 bg-green-900 rounded-md hover:bg-emerald-600 min-w-96 w-1/2 transition-all duration-[334ms] font-thin'
						key={v}
					>
						{v}
					</a>
				)
			})}
			<a
				href='https://github.com/spacehare/spacehare.github.io'
				className='hover:text-lime-50 text-lime-200 transition-all duration-200 hover:scale-105 text-lg font-thin'
			>
				https://github.com/spacehare/spacehare.github.io
			</a>
		</div>
	)
}
