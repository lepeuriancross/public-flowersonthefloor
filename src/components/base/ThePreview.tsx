// Component: ThePreview
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Component ----------*/

// Typings
export type ThePreviewProps = {
	name: ThemePage;
	params?: {
		slug?: string;
		lastId?: string | null;
		sessionId?: string;
	};
	result?: SanityResult;
	className?: string;
	children?: React.ReactNode;
};

// Default component
export default function ThePreview({
	name,
	params,
	result,
	className,
	children,
}: ThePreviewProps) {
	// Return default
	return (
		<div className={classNames(`preview-wrapper`, className)}>
			<h2 className="`preview-wrapper__title block h-[40px] px-6 bg-black text-white">
				Preview Mode
			</h2>
			{children}
		</div>
	);
}
