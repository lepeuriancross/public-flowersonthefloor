// Component: TheProviderTheme
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Typings
// ...

// Data
// ...

// Scripts (node)
import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

// Scripts (local)
// ...

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// ...

/*---------- Component ----------*/

// Export default component
export default function TheProviderTheme({
	children,
	...props
}: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
