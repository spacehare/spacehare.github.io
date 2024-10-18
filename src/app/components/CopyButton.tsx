'use client'

type Props = {
	text?: string
	obj: any
	className: string
}

export default function ({ text, obj, className }: Props) {
	let ex = text || obj.dif || '-'
	return (
		<button
			className={className}
			key={obj.dif}
			onClick={() => {
				navigator.clipboard.writeText(obj.data)
			}}
		>
			{text || obj.dif || '-'}
		</button>
	)
}
