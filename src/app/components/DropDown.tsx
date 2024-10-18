'use client'
type Props = {
	label: string
	items: Array<string>
	setter: any
	getter: any
	className?: string
}

export default ({ label, items, setter, getter, className }: Props) => {
	return (
		<div className={className}>
			<div className='w-full text-right'>{label}</div>
			<select
				className='w-full bg-emerald-900/50 rounded-sm'
				value={getter}
				onChange={(e) => {
					setter(e.currentTarget.value)
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
