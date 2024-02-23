// Sanity: Schema / Product
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { defineField, defineType } from 'sanity';

/*---------- Exports ----------*/

// Default schema
export default defineType({
	// General
	name: 'category',
	title: 'Category',
	type: 'document',

	// Fields
	fields: [
		// Define Field - isActive
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required().warning(`'Title' is required`),
		}),

		// Define Field - slug
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

		// Define Field - description
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			validation: (Rule) =>
				Rule.max(160).warning(
					`'Description' should be less than 160 characters`
				),
		}),
	],
});
