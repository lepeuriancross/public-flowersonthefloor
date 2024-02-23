// Component: ButtonWrapper
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { usePathname } from 'next/navigation';

// Scripts (local)
import { classNames } from '@/lib/utils';
import { parseButtons } from '@/sanity/lib/utils';

// Components (node)
import Link from 'next/link';

// Components (local)
import Button from '@/components/singles/Button/Button';

/*---------- Static Data ----------*/

// Name
const name = 'ButtonWrapper';

/*---------- Component ----------*/

// Typings
type ButtonWrapperProps = {
	buttons?: ListButtons;
	themeSection?: ThemeSection;
	children?: React.ReactNode;
};

// Default component
export default function ButtonWrapper({
	buttons = [],
	themeSection = 'default',
	children,
}: ButtonWrapperProps) {
	/*----- Router -----*/

	// Get pathname
	const pathname = usePathname();

	/*----- Init -----*/

	// Parse buttons
	const parsedButtons = parseButtons(buttons);

	// Return default
	return (
		<div
			className={classNames(
				`button-wrapper inline-flex items-center gap-x-4`,
				classNames
			)}
		>
			{parsedButtons.map((button, b) => {
				const { name, path, target, theme } = button;
				return (
					<Link
						key={`button-wrapper-button-${b}`}
						href={path ?? ''}
						target={target}
					>
						<Button
							isActive={pathname === path}
							component="button-text"
							type="button"
							text={name}
							theme={theme}
							themeSection={themeSection}
						/>
					</Link>
				);
			})}
			{children}
		</div>
	);
}
