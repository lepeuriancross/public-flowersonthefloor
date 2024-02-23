// Component: NavHeader
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
const name = 'NavHeader';

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
export type NavHeaderProps = {
	className?: string;
};

// Default component
export default function NavHeader({ className }: NavHeaderProps) {
	/*----- Router -----*/

	// Get pathname
	const pathname = usePathname();

	/*----- Init -----*/

	// Return default
	return (
		<nav className={classNames(`nav`, className)} data-name={name}>
			<ul className="nav__list flex flex-col justify-start items-start space-y-4">
				{nav.map((item, i) => (
					<li className="nav__item block w-full" key={`nav-header-item-${i}`}>
						<Link
							className={classNames(
								`nav__link relative inline-block rounded-full font-button text-2xl uppercase transition-all duration-300 ease-in-out lg:hover:scale-110 lg:text-3xl text-white`,
								pathname === item.path && 'is-active pointer-events-none'
							)}
							href={item.path}
							target={item.target}
						>
							<span className="nav__link-text">{item.name}</span>
							<span
								className="nav__link-line absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -rotate-3 h-[5px] rounded-full bg-primary-dark"
								style={{
									width: pathname === item.path ? `calc(100% + 1rem)` : `0%`,
								}}
							/>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
