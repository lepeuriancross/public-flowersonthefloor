// Component: LayoutRoot
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import type { Config } from 'tailwindcss';

/*---------- Config ----------*/

// Default config
const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
			},
			zIndex: {
				100: '100',
				90: '90',
				80: '80',
				70: '70',
				60: '60',
				50: '50',
				40: '40',
				30: '30',
				20: '20',
				10: '10',
			},
			fontFamily: {
				title: ['var(--font-title)'],
				subtitle: ['var(--font-subtitle)'],
				button: ['var(--font-button)'],
				body: ['var(--font-body)'],
			},
			fontSize: {
				'2xs': '11px',
				'3xs': '10px',
			},
			transitionProperty: {
				size: 'width, height',
				position: 'top, left, transform',
				fade: 'transform, opacity',
			},
			colors: {
				primary: {
					DEFAULT: '#8362A7',
					light: '#F0E5FF',
					dark: '#5E417D',
				},
				secondary: {
					DEFAULT: '#85C171',
					light: '#DBFDD0',
					dark: '#48703A',
				},
				green: {
					DEFAULT: '#BFE4B4',
					light: '#EEF9EB',
					dark: '#A1CFA0',
				},
				pink: {
					DEFAULT: '#E74B95',
					light: '#F9EAF1',
					dark: '#D22F7B',
				},
				teal: {
					DEFAULT: '#97D0CA',
					light: '#E7F7F5',
					dark: '#6CAAA3',
				},
				black: {
					DEFAULT: '#1F1E1F',
					light: '#2F2E2F',
					dark: '#000000',
				},
				yellow: {
					DEFAULT: '#fcbf04',
					light: '#FDFDE7',
					dark: '#D8D81F',
				},
				white: {
					DEFAULT: '#FFFFFF',
					light: '#FFFFFF',
					dark: '#F0F0F0',
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
	],
};

/*---------- Exports ----------*/

export default config;
