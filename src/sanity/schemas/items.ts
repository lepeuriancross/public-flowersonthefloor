// Sanity: Schema Items
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { defineField, defineType } from 'sanity';

/*---------- Exports ----------*/

// Define schema - review
export const review = defineType({
	// Data
	name: 'review',
	title: 'Review',
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

		// Body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),
	],

	// Initial values
	initialValue: {},

	// Preview
	preview: {
		select: {
			title: 'title',
		},
		prepare(selection) {
			const { title } = selection;
			return { ...selection };
		},
	},
});

// Define schema - detail
export const detail = defineType({
	// Data
	name: 'detail',
	title: 'Detail',
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

		// Items
		defineField({
			name: 'items',
			title: 'Items',
			type: 'array',
			of: [{ type: 'string' }],
		}),

		// Body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),
	],

	// Initial values
	initialValue: {},

	// Preview
	preview: {
		select: {
			title: 'title',
		},
		prepare(selection) {
			const { title } = selection;
			return { ...selection };
		},
	},
});
