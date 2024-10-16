/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	output: 'export',

	// yaml importing
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.yaml/,
			use: 'js-yaml-loader',
		})
		return config
	},
}

export default nextConfig
