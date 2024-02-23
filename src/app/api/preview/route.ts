// API Route: Preview Mode
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { type NextRequest } from 'next/server';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

// Scripts (local)
// ...

// Components (node)
// ...

// Components (local)
// ...

/*---------- Functions ----------*/

// Function - GET
export async function GET(req: NextRequest) {
	// Get query values
	const type = req.nextUrl.searchParams.get('type');
	const slug = req.nextUrl.searchParams.get('slug');

	// If type / slug are not defined...
	if (!type || !slug) {
		// Redirect to 400
		return redirect('/400');
	} else {
		// Enable draft mode
		draftMode().enable();

		// Swich - type
		switch (type) {
			case 'page':
				// Redirect to page
				return slug ? redirect(`/${slug}`) : redirect(`/404`);
			case 'product':
				// Redirect to project
				return slug ? redirect(`/product/${slug}`) : redirect(`/404`);
			case 'project':
				// Redirect to project
				return slug ? redirect(`/project/${slug}`) : redirect(`/404`);
			case 'post':
				// Redirect to post
				return slug ? redirect(`/post/${slug}`) : redirect(`/404`);
			case 'author':
				// Redirect to author
				return slug ? redirect(`/author/${slug}`) : redirect(`/404`);
			case 'category':
				// Redirect to category
				return slug ? redirect(`/category/${slug}`) : redirect(`/404`);
			case 'client':
				// Redirect to client
				return slug ? redirect(`/client/${slug}`) : redirect(`/404`);
			default:
				// Redirect to 400
				return redirect(`/400`);
		}
	}
}
