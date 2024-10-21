import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'TrenchBroom Prefabs',
	description: 'For copy-pasting prefabs and primitives into TrenchBroom',
	icons: ['img/45 brush.png'],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
