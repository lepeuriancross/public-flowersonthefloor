// Component: TheProviderPreview
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Data
// ...

// Scripts (node)
import { useMemo } from 'react';

// Scripts (local)
import { getClient } from '@/sanity/lib/client';

// Components (node)
import { LiveQueryProvider } from '@sanity/preview-kit';

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'TheProviderPreview';

/*---------- Template ----------*/

// Typings
type TheProviderPreviewProps = {
	token: string;
	children: React.ReactNode;
};

// Default component
export default function TheProviderPreview({
	token,
	children,
}: TheProviderPreviewProps) {
	/*----- Init -----*/

	// Get client
	const client = useMemo(() => getClient({ token }), [token]);

	// Return default
	return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>;
}
