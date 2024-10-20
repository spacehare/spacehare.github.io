import type { MDXComponents } from 'mdx/types'
// https://nextjs.org/docs/app/building-your-application/configuring/mdx

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		a: ({ href, children }) => (
			<a
				href={href}
				className='text-lime-300 hover:text-lime-100 before:content-["🔗"] before:text-md before:mr-2'
			>
				{children}
			</a>
		),
		ul: ({ children }) => (
			<ul className='[&_li]:before:content-["•"] [&_li]:before:text-xl [&_li]:before:mr-2 list-inside'>
				{children}
			</ul>
		),
		hr: () => <hr className='border-lime-200/25' />,
		code: ({ children }) => (
			<code className='bg-solid-light/40 rounded-sm'>{children}</code>
		),
		...components,
	}
}
