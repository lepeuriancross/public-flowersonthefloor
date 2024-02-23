// Sanity: Schema Buttons
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { defineField, defineType } from 'sanity';

// Partials
const arThemeButton = [
	{ title: 'Default', value: 'default' },
	{ title: 'Outline', value: 'outline' },
	{ title: 'Block', value: 'block' },
];

/*---------- Exports ----------*/

// Define schema - archive
export const archive = defineType({
	// Data
	name: 'archive',
	title: 'Archive',
	type: 'object',

	// Fields
	fields: [
		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),

		// Define field - type
		defineField({
			name: 'type',
			title: 'Document Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Product', value: 'product' },
					{ title: 'Project', value: 'project' },
					{ title: 'Post', value: 'post' },
					{ title: 'Author', value: 'author' },
					{ title: 'Category', value: 'category' },
				],
			},
		}),

		// Define field - theme
		defineField({
			name: 'theme',
			title: 'Theme',
			type: 'string',
			options: {
				list: arThemeButton,
			},
		}),
	],

	// Initial values
	initialValue: {
		type: 'product',
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			docType: 'docType',
		},
		prepare(selection) {
			const { docType } = selection;
			return { ...selection, subtitle: docType && `${docType}` };
		},
	},
});

// Define schema - ref
export const ref = defineType({
	// Data
	name: 'ref',
	title: 'Reference',
	type: 'object',

	// Fields
	fields: [
		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),

		// Define field - reference
		defineField({
			name: 'reference',
			title: 'Reference',
			type: 'reference',
			to: [
				{ type: 'page' },
				{ type: 'product' },
				{ type: 'project' },
				{ type: 'post' },
				{ type: 'author' },
				{ type: 'category' },
			],
			validation: (Rule) => Rule.required(),
		}),

		// Define field - theme
		defineField({
			name: 'theme',
			title: 'Theme',
			type: 'string',
			options: {
				list: arThemeButton,
			},
		}),
	],

	// Initial values
	initialValue: {
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			docType: 'docType',
		},
		prepare(selection) {
			const { docType } = selection;
			return { ...selection, subtitle: docType && `${docType}` };
		},
	},
});

// Define schema - link
export const link = defineType({
	// Data
	name: 'link',
	title: 'Link',
	type: 'object',

	// Fields
	fields: [
		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),

		// Define field - href
		defineField({
			name: 'href',
			title: 'Href',
			type: 'url',
			validation: (Rule) =>
				Rule.required().uri({
					scheme: ['http', 'https', 'mailto', 'tel'],
				}),
		}),

		// Define field - target
		defineField({
			name: 'target',
			title: 'Target',
			type: 'string',
			options: {
				list: [
					{ title: 'Self', value: '_self' },
					{ title: 'Blank', value: '_blank' },
				],
			},
		}),

		// Define field - theme
		defineField({
			name: 'theme',
			title: 'Theme',
			type: 'string',
			options: {
				list: arThemeButton,
			},
		}),
	],

	// Initial values
	initialValue: {
		target: '_self',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			url: 'url',
		},
		prepare(selection) {
			const { url } = selection;
			return { ...selection, subtitle: url && `${url}` };
		},
	},
});
