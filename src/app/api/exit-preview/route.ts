// API Route: Exit Preview Mode
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
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
export async function GET() {
	// Disable draft mode
	draftMode().disable();

	// Redirect to index page
	redirect(`/`);
}
