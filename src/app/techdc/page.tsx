'use client'
import DropDown from '../components/DropDown'
import { useState } from 'react'
import Tech from '@/app/assets/techdc/techdc.json'
import HomeLink from '../components/HomeLink'
import ValidDisplay from './valid.mdx'

export default function Page() {
	const valid = /^[a-zA-Z0-9#-\s]$|Shift|Backspace|Space/
	return (
		<div className='h-screen p-3'>
			<div className='min-w-fit w-2/3 max-w-2xl m-auto flex flex-col justify-start items-center h-max min-h-full bg-solid-light rounded-md p-2 gap-3'>
				{/* USER CONTROLS */}
				<input
					autoFocus
					placeholder='The Quake Brown Fox'
					className='rounded-md p-2 bg-solid-dark text-lime-200 placeholder:text-lime-200/60 w-full font-atkinson'
				/>
				<div className='flex w-full justify-between gap-6'>
					<div className='flex flex-col gap-1.5 w-64'>
						<DropDown
							label='color'
							items={Tech.colors.map((v) => {
								return v.tex
							})}
							itemNames={Tech.colors.map((v) => {
								return v.name
							})}
							getter={() => {}}
							setter={() => {}}
							storageKey='techdc_color'
							className='flex gap-2 lowercase [&_div]:w-16'
						/>
						<DropDown
							label='style'
							items={Tech.styles.map((v) => {
								return v.name
							})}
							getter={() => {}}
							setter={() => {}}
							storageKey='techdc_color'
							className='flex gap-2 lowercase [&_div]:w-16'
						/>
					</div>
					<button className='flex flex-col bg-green-700 p-2 rounded-md w-64 [&_*]:text-center [&_*]:w-full hover:bg-green-600 active:bg-green-500 active:scale-90 transition'>
						<span className='capitalize'>generate & copy</span>
						<span className='opacity-60 uppercase'>(enter)</span>
					</button>
				</div>
				{/* PREVIEW */}
				<div className='bg-solid-dark w-full h-full p-2 text-lime-400 grow rounded-md'>
					Hi! Type something in the box above to generate a brush for
					TrenchBroom.
				</div>
				{/* HINTS */}
				<div className='bg-solid-dark p-4 rounded-2xl flex flex-col gap-2'>
					<h1 className='font-roboto font-thin text-xl text-center'>
						valid characters
					</h1>
					<pre className='text-center font-mono font-bold text-lime-200'>
						<ValidDisplay />
					</pre>
					<hr className='border-lime-200/25' />
					<div className='flex justify-between'>
						<div className='font-thin'>valid regex:</div>
						<span className='font-robotoMono font-light text-lime-200'>
							{String(valid)}
						</span>
					</div>
				</div>
				<a
					className='text-lime-300 hover:text-lime-100 before:content-["🔗"] before:text-md before:mr-2'
					href='https://www.slipseer.com/index.php?resources/makkon-textures.28/'
				>
					https://www.slipseer.com/index.php?resources/makkon-textures.28/
				</a>
				<HomeLink />
			</div>
		</div>
	)
}
