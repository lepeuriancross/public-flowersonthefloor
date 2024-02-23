// Config: Sanity
/*--------------------------------------------------------------------------------------------
* This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
* Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
* Add and edit the content schema in the './sanity/schema' folder
* Vision is a tool that lets you query your content with Groq in the studio. See https://www.sanity.io/docs/the-vision-plugin
--------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { visionTool } from '@sanity/vision';
import { type SanityDocument, defineConfig } from 'sanity';
import { type DefaultDocumentNodeResolver, deskTool } from 'sanity/desk';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schema } from './src/sanity/schema';

// Components (node)
import Iframe from 'sanity-plugin-iframe-pane';

/*---------- Functions ----------*/

// Customize this function to show the correct URL based on the current document
export function getPreviewUrl(doc: any) {
	return doc._type && doc?.slug?.current
		? `http://${window.location.host}/api/preview?type=${doc._type}&slug=${doc.slug.current}`
		: window.location.host;
}

// Function - Default Document Node
const defaultDocumentNode: DefaultDocumentNodeResolver = (
	S,
	{ schemaType }
) => {
	// Only show preview pane on `movie` schema type documents
	switch (schemaType) {
		case `page`:
			return S.document().views([
				S.view.form(),
				S.view
					.component(Iframe)
					.options({
						url: (doc: SanityDocument) => getPreviewUrl(doc),
					})
					.title('Preview'),
			]);
		case `product`:
			return S.document().views([
				S.view.form(),
				S.view
					.component(Iframe)
					.options({
						url: (doc: SanityDocument) => getPreviewUrl(doc),
					})
					.title('Preview'),
			]);
		case `subscription`:
			return S.document().views([
				S.view.form(),
				S.view
					.component(Iframe)
					.options({
						url: (doc: SanityDocument) => getPreviewUrl(doc),
					})
					.title('Preview'),
			]);
		case `project`:
			return S.document().views([
				S.view.form(),
				S.view
					.component(Iframe)
					.options({
						url: (doc: SanityDocument) => getPreviewUrl(doc),
					})
					.title('Preview'),
			]);
		case `post`:
			return S.document().views([
				S.view.form(),
				S.view
					.component(Iframe)
					.options({
						url: (doc: SanityDocument) => getPreviewUrl(doc),
					})
					.title('Preview'),
			]);
		case `author`:
			return S.document().views([
				S.view.form(),
				S.view
					.component(Iframe)
					.options({
						url: (doc: SanityDocument) => getPreviewUrl(doc),
					})
					.title('Preview'),
			]);
		case `category`:
			return S.document().views([
				S.view.form(),
				S.view
					.component(Iframe)
					.options({
						url: (doc: SanityDocument) => getPreviewUrl(doc),
					})
					.title('Preview'),
			]);
		default:
			return S.document().views([S.view.form()]);
	}
};

/*---------- Config ----------*/

// Default config
export default defineConfig({
	basePath: '/studio',
	projectId,
	dataset,
	schema,
	plugins: [
		deskTool({
			structure: (S) =>
				S.list()
					.title('Content')
					.items([
						// Our singleton type has a list item with a custom child
						S.listItem().title('Settings').id('settings').child(
							// Instead of rendering a list of documents, we render a single document, specifying the `documentId` manually to ensure that we're editing the single instance of the document
							S.document().schemaType('settings').documentId('settings')
						),
						// Regular document types
						S.documentTypeListItem('page').title('Pages'),
						S.documentTypeListItem('product').title('Product'),
						S.documentTypeListItem('subscription').title('Subscriptions'),
						S.documentTypeListItem('project').title('Projects'),
						S.documentTypeListItem('post').title('Posts'),
						S.documentTypeListItem('author').title('Authors'),
						S.documentTypeListItem('category').title('Categories'),
					]),
			defaultDocumentNode,
		}),
		// Vision is a tool that lets you query your content with GROQ in the studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
	],
});
