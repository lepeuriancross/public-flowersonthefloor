// Component: TheFooter
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import Link from 'next/link';

// Components (local)
import NavFooter from '@/components/singles/Nav/NavFooter';
import NavSocial from '../singles/Nav/NavSocial';

/*---------- Static Data ----------*/

// Name
const name = 'TheFooter';

/*---------- Template ----------*/

// Types
export type TheFooterProps = {
	className?: string;
};

// Default component
export default function TheFooter({ className }: TheFooterProps) {
	// Return default
	return (
		<footer
			className={classNames(`footer bg-primary-dark text-white`, className)}
			data-name={name}
		>
			<div className="footer__container px-6 lg:px-8 lg:flex-row">
				<div className="footer__row flex flex-col justify-between mx-auto py-8 container space-y-10 overflow-hidden lg:flex-row lg:space-y-0 lg:space-x-12">
					<NavFooter />
					<NavSocial />
				</div>
			</div>
			<div className="footer__container px-6 lg:px-8 lg:flex-row bg-black/20">
				<div className="footer__row mx-auto overflow-hidden py-4">
					<p className="text-center text-xs leading-5">
						© Copyright <span>{new Date().getFullYear()}</span>{' '}
						<Link href="https://www.flowersonthefloor.com">
							Flowers On The Floor
						</Link>{' '}
						| Website by{' '}
						<Link href="https://www.lepeuriancross.dev" target="_blank">
							Richard Le Peurian Cross
						</Link>
					</p>
				</div>
			</div>
		</footer>
	);
}
