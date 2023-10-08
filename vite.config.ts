import { defineConfig } from 'vite'
import { resolve } from 'path'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
	plugins: [solidPlugin()],
	server: {
		port: 3000,
	},
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				prefabs: resolve(__dirname, 'prefabs/index.html'),
				techdc: resolve(__dirname, 'techdc/index.html'),
			},
		},
		target: 'esnext',
	},
})
