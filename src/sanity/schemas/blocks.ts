// Sanity: Schema Blocks
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { defineField, defineType } from 'sanity';

// Partials
import {
	listImages,
	listReviews,
	listButtons,
	themeSection,
} from '@/sanity/schemas/_partials';

/*---------- Exports ----------*/

// Define Type - blockHero
export const blockHero = defineType({
	// Data
	name: 'blockHero',
	title: 'Section Hero',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Hero #1', value: 'section-hero-1' },
					// { title: 'Hero #2', value: 'section-hero-2' },
					// { title: 'Hero #3', value: 'section-hero-3' },
					// { title: 'Hero #4', value: 'section-hero-4' },
					// { title: 'Hero #5', value: 'section-hero-5' },
					// { title: 'Hero #6', value: 'section-hero-6' },
					// { title: 'Hero #7', value: 'section-hero-7' },
					// { title: 'Hero #8', value: 'section-hero-8' },
					// { title: 'Hero #9', value: 'section-hero-9' },
					// { title: 'Hero #10', value: 'section-hero-10' },
				],
			},
		}),

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		}),

		// Define field - body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),

		// Define field - images
		defineField(listImages('images', 'Images')),

		// Define field - buttons
		defineField(listButtons('buttons', 'Buttons')),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isFlipped
		defineField({
			name: 'isFlipped',
			title: 'Flip / Reverse Columns',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-hero-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		isFlipped: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'images',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title: `Hero: ${title}`,
				subtitle: subtitle,
				media: media ? media[0] : null,
			};
		},
	},
});

// Define Type - blockBody
export const blockBody = defineType({
	// Data
	name: 'blockBody',
	title: 'Section Body',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Body #1', value: 'section-body-1' },
					// { title: 'Body #2', value: 'section-body-2' },
					// { title: 'Body #3', value: 'section-body-3' },
					// { title: 'Body #4', value: 'section-body-4' },
					// { title: 'Body #5', value: 'section-body-5' },
					// { title: 'Body #6', value: 'section-body-6' },
					// { title: 'Body #7', value: 'section-body-7' },
					// { title: 'Body #8', value: 'section-body-8' },
					// { title: 'Body #9', value: 'section-body-9' },
					// { title: 'Body #10', value: 'section-body-10' },
				],
			},
		}),

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		}),

		// Define field - body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),

		// Define field - images
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

		// Define field - buttons
		defineField(listButtons('buttons', 'Buttons')),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isFlipped
		defineField({
			name: 'isFlipped',
			title: 'Flip / Reverse Columns',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-body-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		isFlipped: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'image',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title: `Body: ${title}`,
				subtitle: subtitle,
				media: media,
			};
		},
	},
});

// Define Type - blockColumns
export const blockColumns = defineType({
	// Data
	name: 'blockColumns',
	title: 'Section Columns',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Columns #1', value: 'section-columns-1' },
					// { title: 'Columns #2', value: 'section-columns-2' },
					// { title: 'Columns #3', value: 'section-columns-3' },
					// { title: 'Columns #4', value: 'section-columns-4' },
					// { title: 'Columns #5', value: 'section-columns-5' },
					// { title: 'Columns #6', value: 'section-columns-6' },
					// { title: 'Columns #7', value: 'section-columns-7' },
					// { title: 'Columns #8', value: 'section-columns-8' },
					// { title: 'Columns #9', value: 'section-columns-9' },
					// { title: 'Columns #10', value: 'section-columns-10' },
				],
			},
		}),

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		}),

		// Define field - body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),

		// Define field - buttons
		defineField(listButtons('buttons', 'Buttons')),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-body-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'image',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title: `Body: ${title}`,
				subtitle: subtitle,
				media: media,
			};
		},
	},
});

// Define Type - blockReviews
export const blockReviews = defineType({
	// Data
	name: 'blockReviews',
	title: 'Section Reviews',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Reviews #1', value: 'section-reviews-1' },
					// { title: 'Reviews #2', value: 'section-reviews-2' },
					// { title: 'Reviews #3', value: 'section-reviews-3' },
					// { title: 'Reviews #4', value: 'section-reviews-4' },
					// { title: 'Reviews #5', value: 'section-reviews-5' },
					// { title: 'Reviews #6', value: 'section-reviews-6' },
					// { title: 'Reviews #7', value: 'section-reviews-7' },
					// { title: 'Reviews #8', value: 'section-reviews-8' },
					// { title: 'Reviews #9', value: 'section-reviews-9' },
					// { title: 'Reviews #10', value: 'section-reviews-10' },
				],
			},
		}),

		// Define field - reviews
		defineField(listReviews('reviews', 'Reviews')),

		// Define field - buttons
		defineField(listButtons('buttons', 'Buttons')),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-reviews-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'images',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title: `Reviews: ${title}`,
				subtitle: subtitle,
				media: media ? media[0] : null,
			};
		},
	},
});

// Define Type - blockContactForm
export const blockContactForm = defineType({
	// Data
	name: 'blockContactForm',
	title: 'Section Contact Form',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Contact #1', value: 'section-contact-form-1' },
					// { title: 'Contact #2', value: 'section-contact-form-2' },
					// { title: 'Contact #3', value: 'section-contact-form-3' },
					// { title: 'Contact #4', value: 'section-contact-form-4' },
					// { title: 'Contact #5', value: 'section-contact-form-5' },
					// { title: 'Contact #6', value: 'section-contact-form-6' },
					// { title: 'Contact #7', value: 'section-contact-form-7' },
					// { title: 'Contact #8', value: 'section-contact-form-8' },
					// { title: 'Contact #9', value: 'section-contact-form-9' },
					// { title: 'Contact #10', value: 'section-contact-form-10' },
				],
			},
		}),

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		}),

		// Define field - body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),

		// Define field - successMsg
		defineField({
			name: 'successMsg',
			title: 'Success Message',
			type: 'blockContent',
		}),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isFlipped
		defineField({
			name: 'isFlipped',
			title: 'Flip / Reverse Columns',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-contact-form-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		isFlipped: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
		},
		prepare(selection) {
			const { title, subtitle } = selection;
			return {
				title: `Contact Form: ${title}`,
				subtitle: subtitle,
			};
		},
	},
});

// Define Type - blockProduct (Shop)
export const blockProduct = defineType({
	// Data
	name: 'blockProduct',
	title: 'Section Product',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Product #1', value: 'section-product-1' },
					{ title: 'Product #2', value: 'section-product-2' },
					// { title: 'Product #3', value: 'section-product-3' },
					// { title: 'Product #4', value: 'section-product-4' },
					// { title: 'Product #5', value: 'section-product-5' },
					// { title: 'Product #6', value: 'section-product-6' },
					// { title: 'Product #7', value: 'section-product-7' },
					// { title: 'Product #8', value: 'section-product-8' },
					// { title: 'Product #9', value: 'section-product-9' },
					// { title: 'Product #10', value: 'section-product-10' },
				],
			},
		}),

		// Define field - reference
		defineField({
			name: 'reference',
			title: 'Reference',
			type: 'reference',
			to: [{ type: 'product' }],
			validation: (Rule) => Rule.required(),
		}),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isFlipped
		defineField({
			name: 'isFlipped',
			title: 'Flip / Reverse Columns',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-product-1',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		isFlipped: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'reference.title',
			subtitle: 'reference.subtitle',
			media: 'reference.images',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				// Get title from reference title
				title: `Product: ${title}`,
				subtitle,
				media: media[0],
			};
		},
	},
});

// Define Type - blockSubscriptions (Shop)
export const blockSubscriptions = defineType({
	// Data
	name: 'blockSubscriptions',
	title: 'Section Subscription',
	type: 'object',

	// Fields
	fields: [
		/*----- Base -----*/

		// Define field - isActive
		defineField({
			name: 'isActive',
			title: 'Is Active',
			type: 'boolean',
		}),

		// Define field - title
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),

		// Define field - key
		defineField({
			name: 'key',
			title: 'Key',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((key) => {
					if (typeof key === 'undefined') return true;
					const regex = /(^[a-z0-9-]+$)/; // Regex pattern goes here
					if (regex.test(key)) {
						return true;
					} else {
						return 'Invalid key: Only numbers, lowercase letters, and dashes are permitted.'; // Error message goes here
					}
				}),
		}),

		// Define field - component
		defineField({
			name: 'component',
			title: 'Component Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Subscription #1', value: 'section-subscriptions-1' },
					// { title: 'Subscription #2', value: 'section-subscriptions-2' },
					// { title: 'Subscription #3', value: 'section-subscriptions-3' },
					// { title: 'Subscription #4', value: 'section-subscriptions-4' },
					// { title: 'Subscription #5', value: 'section-subscriptions-5' },
					// { title: 'Subscription #6', value: 'section-subscriptions-6' },
					// { title: 'Subscription #7', value: 'section-subscriptions-7' },
					// { title: 'Subscription #8', value: 'section-subscriptions-8' },
					// { title: 'Subscription #9', value: 'section-subscriptions-9' },
					// { title: 'Subscription #10', value: 'section-subscriptions-10' },
				],
			},
		}),

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		}),

		// Define field - body
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),

		// Define field - columns
		defineField({
			name: 'columns',
			title: 'Columns',
			type: 'string',
			options: {
				list: [
					{ title: '2 Columns', value: '2' },
					{ title: '3 Columns', value: '3' },
					{ title: '4 Columns', value: '4' },
				],
			},
		}),

		// Define field - items
		defineField({
			name: 'items',
			title: 'Subscriptions',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'subscription' } }],
		}),

		// Define field - buttons
		defineField(listButtons('buttons', 'Buttons')),

		// Define field - paddingTop
		defineField({
			name: 'paddingTop',
			title: 'Pad at Top',
			type: 'boolean',
		}),

		// Define field - paddingContainer
		defineField({
			name: 'paddingContainer',
			title: 'Pad at Sides',
			type: 'boolean',
		}),

		// Define field - paddingBottom
		defineField({
			name: 'paddingBottom',
			title: 'Pad at Bottom',
			type: 'boolean',
		}),

		// Define field - isCard
		defineField({
			name: 'isCard',
			title: 'Show as Card',
			type: 'boolean',
		}),

		// Define field - theme
		defineField(themeSection('theme', 'Section Theme')),

		// Define field - className
		defineField({
			name: 'className',
			title: 'Section Class Names',
			type: 'string',
		}),
	],

	// Initial values
	initialValue: {
		isActive: true,
		component: 'section-subscriptions-1',
		columns: '3',
		paddingTop: true,
		paddingContainer: true,
		paddingBottom: true,
		isCard: false,
		theme: 'default',
	},

	// Preview
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			media: 'images',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title: `Subscriptions: ${title}`,
				subtitle: subtitle,
				media: media ? media[0] : null,
			};
		},
	},
});
