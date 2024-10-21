import type { Metadata } from 'next'
// import localFont from 'next/font/local'
import {
	Atkinson_Hyperlegible,
	Roboto_Flex,
	Roboto_Mono,
} from 'next/font/google'
import './globals.css'

const atkinson = Atkinson_Hyperlegible({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-atkinson',
	display: 'swap',
})

const roboto = Roboto_Flex({
	// weight: ['100', '1000'],
	subsets: ['latin'],
	variable: '--font-roboto',
})

const roboto_mono = Roboto_Mono({
	// weight: '100',
	subsets: ['latin'],
	variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
	title: 'spacehare',
	description: '',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${roboto.variable} ${roboto_mono.variable} ${atkinson.variable} font-sans text-lime-100 antialiased font-normal bg-solid-med`}
			>
				{children}
			</body>
		</html>
	)
}
