// Sanity: Schema / Post
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { type SchemaTypeDefinition } from 'sanity';

// Objects
import { review, detail } from '@/sanity/schemas/items';
import { archive, ref, link } from '@/sanity/schemas/buttons';

// Blocks
import {
	blockHero,
	blockBody,
	blockReviews,
	blockContactForm,
	blockProduct,
	blockSubscriptions,
} from '@/sanity/schemas/blocks';

// Arrays
import blockContent from '@/sanity/schemas/blockContent';

// Documents
import page from '@/sanity/schemas/page';
import product from '@/sanity/schemas/product';
import project from '@/sanity/schemas/project';
import subscription from '@/sanity/schemas/subscription';
import post from '@/sanity/schemas/post';
import author from '@/sanity/schemas/author';
import category from '@/sanity/schemas/category';

// Singletons
import settings from './schemas/settings';

/*---------- Export ----------*/

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		// Objects
		review,
		detail,
		archive,
		ref,
		link,

		// Blocks
		blockHero,
		blockBody,
		blockReviews,
		blockContactForm,
		blockProduct,
		blockSubscriptions,

		// Arrays
		blockContent,

		// Documents
		page,
		product,
		subscription,
		project,
		post,
		author,
		category,

		// Singletons
		settings,
	],
};
