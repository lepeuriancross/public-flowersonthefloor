// Sanity: Client
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scipts (node)
import { createClient } from 'next-sanity';

// Scripts (local)
import { apiVersion, dataset, projectId, useCdn } from '@/sanity/env';

/*---------- Config ----------*/

// Get sanityConfig
export const sanityConfig = {
	apiVersion,
	dataset,
	projectId,
	useCdn,
};

/*---------- Clients ----------*/

// Export Client
export const client = createClient(sanityConfig);

// Get previewClient
export const previewClient = createClient({
	...sanityConfig,
	useCdn: false,
	// Fallback to using the WRITE token until https://www.sanity.io/docs/vercel-integration starts shipping a READ token.
	// As this client only exists on the server and the token is never shared with the browser, we don't risk escalating permissions to untrustworthy users
	token:
		process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
});

/*---------- Functions ----------*/

// Function - getClient
export const getClient = (preview?: { token?: string }) => {
	// If preview...
	if (preview?.token) {
		// If no valid token...
		if (!preview.token) {
			// Throw error
			throw new Error('You must provide a valid token to preview drafts');
		}

		// Return client with optimised settings for 'previewDrafts'
		return previewClient;
	}

	// Return client
	return client;
};
