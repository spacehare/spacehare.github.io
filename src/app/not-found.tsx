import Link from 'next/link'
import HomeLink from './components/HomeLink'

export default function NotFound() {
	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='w-16 text-center'>
				<div>
					<div className='font-thin font-robotoMono text-2xl select-none'>
						404
					</div>
					<HomeLink />
				</div>
			</div>
		</div>
	)
}
