// Sanity: Schema / Author
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { defineField, defineType } from 'sanity';

/*---------- Exports ----------*/

// Default schema
export default defineType({
	// General
	name: 'author',
	title: 'Author',
	type: 'document',

	// Fields
	fields: [
		// Title
		defineField({
			name: 'title',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required().warning(`'Title' is required`),
		}),

		// Slug
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required().warning(`'Slug' is required`),
		}),

		// Description
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			validation: (Rule) =>
				Rule.max(160).warning(
					`'Description' should be less than 160 characters`
				),
		}),

		// Image
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternative Text',
				},
			],
		}),

		// Body
		defineField({
			name: 'body',
			title: 'Bio',
			type: 'array',
			of: [
				{
					title: 'Block',
					type: 'block',
					styles: [{ title: 'Normal', value: 'normal' }],
					lists: [],
				},
			],
		}),
	],

	// Preview
	preview: {
		select: {
			title: 'title',
			media: 'image',
		},
	},
});
