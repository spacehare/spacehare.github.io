'use client'

type Props = {
	text?: string
	obj: { dif: string; data: string }
	callback: (data: string) => void
	className: string
}

export default function CopyButton({ text, obj, callback, className }: Props) {
	const label = text || obj.dif || '-'
	return (
		<button
			className={`${className} select-none bg-solid-light hover:brightness-150 active:brightness-200 active:scale-90 transition duration-100`}
			key={obj.dif}
			title={label}
			onMouseDown={() => {
				callback(obj.data)
			}}
		>
			{label}
		</button>
	)
}
