import Link from 'next/link'

export default function HomeLink() {
	return (
		<Link
			className='text-lime-300 hover:text-lime-100 before:content-["↩"] text-center text-2xl before:text-md before:mr-2 w-full'
			href='/'
		>
			/
		</Link>
	)
}
