// Component: PageIndex
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { draftMode } from 'next/headers';

// Scripts (local)
import { getPage } from '@/sanity/lib/utils';

// Components (node)
// ...

// Components (local)
import TheProviderPreview from '@/components/base/TheProviderPreview';
import ThePreview from '@/components/base/ThePreview';
import TheContent from '@/components/base/TheContent';

/*---------- Static Data ----------*/

// Name
const name = 'PageIndex';

/*---------- Component ----------*/

// Typings
export type PageIndexProps = {
	searchParams: {
		lastId?: string;
	};
};

// Force dynamic
export const dynamic = 'force-dynamic';

// Default component
export default async function PageIndex({ searchParams }: PageIndexProps) {
	/*----- Init -----*/

	// Get lastId
	const lastId = searchParams?.lastId ?? '';

	// Get preview
	const preview = draftMode().isEnabled
		? { token: process.env.SANITY_API_READ_TOKEN }
		: undefined;

	// Get data
	const result = await getPage(name, { lastId }, preview);

	// If preview token...
	if (preview?.token) {
		// Return preview page
		return (
			<TheProviderPreview token={preview.token}>
				<ThePreview name={name} result={result} />
			</TheProviderPreview>
		);
	} else {
		// Return default
		return (
			<div
				className="page flex min-h-screen flex-col items-center justify-between"
				data-name={name}
			>
				<TheContent name={name} result={result} />
			</div>
		);
	}
}
