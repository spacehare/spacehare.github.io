import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'TrenchBroom Prefabs',
	description: '',
	icons: ['img/45 brush.png'],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className=''>
			<body>{children}</body>
		</html>
	)
}
