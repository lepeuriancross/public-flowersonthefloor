// Sanity: Schema Blocks
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
// ...

// Partials
export const arListButtons = [
	{ type: 'archive' },
	{ type: 'ref' },
	{ type: 'link' },
];

// Partials
export const arFlexContent = [
	{ type: 'blockHero' },
	{ type: 'blockBody' },
	{ type: 'blockReviews' },
	{ type: 'blockContactForm' },
	{ type: 'blockProduct' },
	{ type: 'blockSubscriptions' },
];

/*---------- Exports ----------*/

// Partial - themeSection
export function themeSection(name?: string, title?: string) {
	return {
		name: name ?? 'themeSection',
		title: title ?? 'Section Theme',
		type: 'string',
		options: {
			list: [
				{ title: 'Default', value: 'default' },
				{ title: 'Primary', value: 'primary' },
				{ title: 'Secondary', value: 'secondary' },
				// { title: 'Tertiary', value: 'tertiary' },
				// { title: 'Quaternary', value: 'quaternary' },
				{ title: 'Black', value: 'black' },
				{ title: 'White', value: 'white' },
			],
		},
	};
}

// Partial - listImages
export function listImages(name?: string, title?: string, group?: string) {
	return {
		name: name ?? 'images',
		title: title ?? 'Images',
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
		...(group ? { group } : {}),
	};
}

// Partial - listReviews
export function listReviews(name?: string, title?: string, group?: string) {
	return {
		name: name ?? 'reviews',
		title: title ?? 'Reviews',
		type: 'array',
		of: [{ type: 'review' }],
		...(group ? { group } : {}),
	};
}

// Partial - listDetails
export function listDetails(name?: string, title?: string, group?: string) {
	return {
		name: name ?? 'details',
		title: title ?? 'Details',
		type: 'array',
		of: [{ type: 'detail' }],
		...(group ? { group } : {}),
	};
}

// Partial - listButtons
export function listButtons(name?: string, title?: string, group?: string) {
	return {
		name: name ?? 'buttons',
		title: title ?? 'Buttons',
		type: 'array',
		of: arListButtons,
		...(group ? { group } : {}),
	};
}
