// Sanity: Schema / Product
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { defineField, defineType } from 'sanity';

// Partials
import { arFlexContent, listDetails } from '@/sanity/schemas/_partials';

/*---------- Exports ----------*/

// Default schema
export default defineType({
	// General
	name: 'product',
	title: 'Product',
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

		// Define Field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
			group: 'general',
		}),

		// Define Field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required().warning(`'Title' is required`),
			group: 'general',
		}),

		// Define Field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
			group: 'general',
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
			// Validation - value can not be 'success' or 'error'
			validation: (Rule) => Rule.required().warning(`'Slug' is required`),
			group: 'general',
		}),

		// Define Field - productId
		defineField({
			name: 'productId',
			title: 'Product ID',
			type: 'string',
			validation: (Rule) => Rule.required().warning(`'Product ID' is required`),
			group: 'general',
		}),

		// Define Field - publishedAt
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			validation: (Rule) =>
				Rule.required().warning(`'Published at' is required`),
			group: 'general',
		}),

		// Define Field - expiresAt
		defineField({
			name: 'expiresAt',
			title: 'Expires at',
			type: 'datetime',
			validation: (Rule) =>
				Rule.required()
					.min(Rule.valueOfField('publishedAt'))
					.warning(`Must be later than 'Published at'`),
			group: 'general',
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
			group: 'general',
		}),

		// Define Field - images
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

		// Define Field - price
		defineField({
			name: 'price',
			title: 'Price',
			type: 'number',
			group: 'general',
			validation: (Rule) => Rule.required().warning(`'Price' is required`),
		}),

		// Define Field - priceSuffix
		defineField({
			name: 'priceSuffix',
			title: 'Price Suffix',
			type: 'string',
			group: 'general',
		}),

		// Define Field - body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
			group: 'general',
		}),

		// Define Field - details
		defineField(listDetails('details', 'Details', 'general')),

		// Define Field - categories
		defineField({
			name: 'categories',
			title: 'Categories',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'category' } }],
			group: 'general',
		}),

		/*----- Content -----*/

		// Define Field - flexContent
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
		expiresAt: new Date(
			new Date().setMonth(new Date().getMonth() + 1)
		).toISOString(),
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
