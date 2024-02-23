// Component: ProviderRedux
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Typings
// ...

// Data
// ...

// Scripts (node)
import { Provider } from 'react-redux';

// Scripts (local)
import { store } from '@/redux';

// Components (node)
// ...

// Components (local)
// ...

// Styles
// ...

// Fonts
// ...

/*---------- Static Data ----------*/

// Name
const name = 'ProviderRedux';

/*---------- Component ----------*/

// Typings
type ProviderReduxProps = {
	children?: React.ReactNode;
};

// Export default component
export default function ProviderRedux({ children }: ProviderReduxProps) {
	return <Provider store={store}>{children}</Provider>;
}
