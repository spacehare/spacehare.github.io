'use client'
type Props = {
	label: string
	items: Array<string>
	setter: any
	getter: any
	className?: string
	storageKey?: string
}

export default ({
	label,
	items,
	setter,
	getter,
	className,
	storageKey,
}: Props) => {
	return (
		<div className={className}>
			<div className='w-full text-right m-auto'>{label}</div>
			<select
				className='w-full bg-solid-dark rounded-md p-1 h-fit'
				value={getter}
				onChange={(e) => {
					setter(e.currentTarget.value)
					if (storageKey)
						localStorage.setItem(storageKey, e.currentTarget.value)
				}}
			>
				{items.map((item) => (
					<option value={item} content={item} className='bg-emerald-700'>
						{item}
					</option>
				))}
			</select>
		</div>
	)
}
