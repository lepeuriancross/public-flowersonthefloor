// Component: ButtonMenu
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useDispatch } from 'react-redux';

// Scripts (local)
import { classNames } from '@/lib/utils';
import { AppDispatch, useAppSelector } from '@/redux';
import { setIsShowingMenu } from '@/redux/slices/sliceManager';

// Components (node)
import { Bars2Icon } from '@heroicons/react/24/outline';

// Components (local)
import Button from '@/components/singles/Button/Button';

/*---------- Static Data ----------*/

// Name
const name = 'ButtonMenu';

/*---------- Component ----------*/

// Typings
type ButtonMenuProps = {
	theme?: ThemeButton;
	themeSection?: ThemeSection;
	className?: string;
};

// Default component
export default function ButtonMenu({
	theme = 'block',
	themeSection = 'default',
	className,
}: ButtonMenuProps) {
	/*----- Store -----*/

	// Redux state - isShowingMenu
	const isShowingMenu = useAppSelector((state) => state.manager.isShowingMenu);

	// Use dispatch
	const dispatch = useDispatch<AppDispatch>();

	/*----- Functions -----*/

	// Function - handleClick
	const handleClick = () => {
		// Toggle isShowingMenu
		dispatch(setIsShowingMenu(!isShowingMenu));
	};

	/*----- Init -----*/

	// Return default
	return (
		<Button
			className={className}
			component="button-icon"
			type="button"
			icon={<Bars2Icon className="w-7 h-auto" />}
			text="Toggle Menu"
			theme={theme}
			themeSection={themeSection}
			onClick={handleClick}
		/>
	);
}
