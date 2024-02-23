// Sanity: Schema / Post
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { defineField, defineType } from 'sanity';

// Partials
import { arFlexContent } from '@/sanity/schemas/_partials';

/*---------- Exports ----------*/

// Default schema
export default defineType({
	// General
	name: 'post',
	title: 'Post',
	type: 'document',

	// Groups
	groups: [
		// General
		{
			name: 'general',
			title: 'General',
			default: true,
		},
		{
			name: 'content',
			title: 'Content',
		},
	],

	// Fields
	fields: [
		/*----- General -----*/

		// Is Active
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
			group: 'general',
		}),

		// Title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required().warning(`'Title' is required`),
			group: 'general',
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
			group: 'general',
		}),

		// Published at
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			validation: (Rule) =>
				Rule.required().warning(`'Published at' is required`),
			group: 'general',
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
			group: 'general',
		}),

		// Images
		defineField({
			name: 'images',
			title: 'Images',
			type: 'array',
			of: [
				{
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
				},
			],
			group: 'general',
		}),

		// Body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
			group: 'general',
		}),

		// Categories
		defineField({
			name: 'categories',
			title: 'Categories',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'category' } }],
			group: 'general',
		}),

		// Author
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: { type: 'author' },
			group: 'general',
		}),

		/*----- Content -----*/

		// Define Field - Body
		defineField({
			name: 'flexContent',
			title: 'Flexible Content',
			type: 'array',
			of: [...arFlexContent],
			group: 'content',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		publishedAt: new Date().toISOString(),
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			author: 'author.name',
			media: 'image',
		},
		prepare(selection) {
			const { author } = selection;
			return { ...selection, subtitle: author && `by ${author}` };
		},
	},
});
