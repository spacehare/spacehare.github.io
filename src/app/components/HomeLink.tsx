import Link from "next/link"

export default function HomeLink() {
	return (
		<Link
			className='text-lime-300 hover:text-lime-100 text-center text-2xl w-full'
			href='/'
		>
			<span className='text-lg'>↩</span> <span>home</span>
		</Link>
	)
}
