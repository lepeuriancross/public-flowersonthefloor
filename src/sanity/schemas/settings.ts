// Sanity: Schema Settings
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { staticMeta } from '@/data/content';

// Scripts (node)
import { defineField, defineType } from 'sanity';

// Scripts (local)
import { listButtons } from '@/sanity/schemas/_partials';

/*---------- Exports ----------*/

// Define type - settings
const settings = defineType({
	// Data
	name: 'settings',
	title: 'Settings',
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
			name: 'nav',
			title: 'Navigation',
		},
		{
			name: 'comingSoon',
			title: 'Coming Soon',
		},
	],

	// Fields
	fields: [
		/*----- General Settings -----*/

		// Define field - title
		defineField({
			name: 'title',
			title: 'Site Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
			group: 'general',
		}),

		// Define field - subtitle
		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
			group: 'general',
		}),

		// Define field - image
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

		// Define field - author
		defineField({
			name: 'author',
			title: 'Site author',
			type: 'reference',
			to: { type: 'author' },
			group: 'general',
		}),

		// Define field - tel
		defineField({
			name: 'tel',
			title: 'Site Telephone',
			type: 'string',
			group: 'general',
			validation: (Rule) =>
				Rule.regex(
					/^\+?(\d{1,3})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})$/
				).warning(
					`'Telephone' should be a valid phone number (e.g. +1 555-555-5555)`
				),
		}),

		// Define field - email
		defineField({
			name: 'email',
			title: 'Site Email',
			type: 'string',
			group: 'general',
			validation: (Rule) =>
				Rule.regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).warning(
					`'Email' should be a valid email address`
				),
		}),

		// Define field - instagram
		defineField({
			name: 'instagram',
			title: 'Site Instagram',
			type: 'string',
			group: 'general',
			validation: (Rule) =>
				Rule.regex(/^(http(s)?:\/\/)?((w){3}.)?instagram?(\.com)?\/.+/).warning(
					`'Instagram' should be a valid URL`
				),
		}),

		// Define field - tiktok
		defineField({
			name: 'tiktok',
			title: 'Site TikTok',
			type: 'string',
			group: 'general',
			validation: (Rule) =>
				Rule.regex(/^(http(s)?:\/\/)?((w){3}.)?tiktok?(\.com)?\/.+/).warning(
					`'TikTok' should be a valid URL`
				),
		}),

		// Define field - homepage
		defineField({
			name: 'homepage',
			title: 'Home Page',
			type: 'reference',
			to: { type: 'page' },
			group: 'general',
		}),

		/*----- Navigation -----*/

		// Define field - navHeader
		defineField(listButtons('navHeader', 'Header Navigation', 'nav')),

		// Define field - navFooter
		defineField(listButtons('navFooter', 'Footer Navigation', 'nav')),

		/*----- Coming Soon -----*/

		// Define field - isComingSoon
		defineField({
			name: 'comingSoonIsActive',
			title: 'Activate Coming Soon',
			description:
				"Deactivate the site and show a 'coming soon' messaging in its place",
			type: 'boolean',
			group: 'comingSoon',
		}),

		// Define field - comingSoonHeroTitle
		defineField({
			name: 'comingSoonTitle',
			title: 'Coming Soon Title',
			type: 'string',
			group: 'comingSoon',
		}),

		// Define field - comingSoonHeroBody
		defineField({
			name: 'comingSoonBody',
			title: 'Coming Soon Body',
			type: 'blockContent',
			group: 'comingSoon',
		}),
	],

	// Initial value
	initialValue: {
		title: staticMeta.title,
		description: staticMeta.description,
		comingSoonIsActive: false,
	},
});

/*---------- Exports ----------*/

// Export default
export default settings;
