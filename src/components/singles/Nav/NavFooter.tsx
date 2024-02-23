// Component: NavFooter
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { usePathname } from 'next/navigation';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import Link from 'next/link';

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'NavFooter';

// Navigation
const nav = [
	{
		name: 'Home',
		path: '/',
		target: '_self',
	},
	{
		name: 'About',
		path: '/about',
		target: '_self',
	},
	{
		name: 'Contact',
		path: '/contact',
		target: '_self',
	},
];

/*---------- Component ----------*/

// Typings
export type NavFooterProps = {
	className?: string;
};

// Default component
export default function NavFooter({ className }: NavFooterProps) {
	/*----- Router -----*/

	// Get pathname
	const pathname = usePathname();

	/*----- Init -----*/

	// Return default
	return (
		<nav className={classNames(`nav`, className)} data-name={name}>
			<ul className="nav__list inline-flex justify-between items-center space-x-4">
				{nav.map((item, i) => (
					<li className="nav__item" key={`nav-header-item-${i}`}>
						<Link
							className={classNames(
								`nav__link relative transform inline-block rounded-full px-4 py-2 font-button text-sm uppercase transition-transform duration-300 ease-in-out lg:hover:scale-110 text-white`,
								pathname === item.path && 'is-active pointer-events-none'
							)}
							href={item.path}
							target={item.target}
						>
							<span className="nav__link-text">{item.name}</span>
							<span
								className="nav__link-line absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -rotate-3 h-[3px] rounded-full bg-white"
								style={{
									width: pathname === item.path ? `calc(100% - 1rem)` : `0%`,
								}}
							/>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
