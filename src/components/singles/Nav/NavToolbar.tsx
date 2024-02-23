// Component: NavToolbar
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
import { configShop } from '@/data/config';

// Scripts (node)
import { usePathname } from 'next/navigation';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import Link from 'next/link';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

// Components (local)
import ButtonToggleCart from '@/components/singles/Button/ButtonToggleCart';
import ButtonMenu from '@/components/singles/Button/ButtonToggleMenu';
import Button from '../Button/Button';

/*---------- Static Data ----------*/

// Name
const name = 'NavToolbar';

/*---------- Component ----------*/

// Typings
export type NavToolbarProps = {
	theme?: ThemeButton;
	themeSection?: ThemeSection;
	className?: string;
};

// Default component
export default function NavToolbar({
	theme = 'default',
	themeSection = 'default',
	className,
}: NavToolbarProps) {
	// Return default
	return (
		<nav
			className={classNames(`nav inline-flex items-center`, className)}
			data-name={name}
		>
			<ul className="nav__list inline-flex justify-between items-center space-x-4">
				{/* Shop Buttons */}
				{configShop.useShop && (
					<li className="nav__item relative inline-flex flex-col justify-center">
						<ButtonToggleCart theme={theme} themeSection={themeSection} />
					</li>
				)}

				{/* Menu Buttons */}
				<li className="nav__item relative inline-flex flex-col justify-center">
					<ButtonMenu
						className="z-10"
						theme={theme}
						themeSection={themeSection}
					/>
				</li>
			</ul>
		</nav>
	);
}
