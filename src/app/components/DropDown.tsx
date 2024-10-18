'use client'
type Props = {
	label: string
	items: Array<string>
	itemNames?: Array<string>
	setter: any
	getter: any
	className?: string
	storageKey?: string
}

export default ({
	label,
	items,
	itemNames,
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
				{items.map((item: string) => (
					<option value={item} className='bg-solid-light'>
						{itemNames ? itemNames[items.findIndex((v) => v === item)] : item}
					</option>
				))}
			</select>
		</div>
	)
}
