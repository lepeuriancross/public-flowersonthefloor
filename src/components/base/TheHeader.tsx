// Component: TheHeader
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useAppSelector } from '@/redux';

// Components (node)
// ...

// Components (local)
import LogoHeader from '@/components/singles/Logo/LogoHeader';
import NavToolbar from '@/components/singles/Nav/NavToolbar';

/*---------- Static Data ----------*/

// Name
const name = 'TheHeader';

/*---------- Component ----------*/

// Typings
export type TheHeaderProps = {
	className?: string;
};

// Default component
export default function TheHeader({ className }: TheHeaderProps) {
	/*----- Store -----*/

	// Redux state - isScrolled
	const isScrolled = useAppSelector((state) => state.manager.isScrolled);

	/*----- Init -----*/

	// Return default
	return (
		<header
			className={classNames(
				`header fixed top-0 left-1/2 transform -translate-x-1/2 flex items-center w-full px-6 h-[80px] text-white`,
				className
			)}
			data-name={name}
		>
			<div
				className={classNames(
					`header__bg absolute z-10 top-0 left-0 w-full h-full shadow transition-opacity duration-300 ease-out bg-primary`,
					!isScrolled && 'opacity-0'
				)}
			/>
			<div className="header__container relative z-20 flex justify-between items-center container mx-auto space-x-6 grow">
				<div className="header__brand inline-flex items-center">
					<LogoHeader />
				</div>

				<div className="header__toolbar inline-flex items-center">
					<NavToolbar
						theme={'block'}
						themeSection={isScrolled > 0 ? 'primary' : 'secondary'}
					/>
				</div>
			</div>
		</header>
	);
}
