// Component: NavSocial
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
import Link from 'next/link';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

// Components (local)
import IconInstagram from '@/components/singles/Icon/IconInstagram';
import IconTikTok from '@/components/singles/Icon/IconTikTok';

/*---------- Static Data ----------*/

// Name
const name = 'NavSocial';

/*---------- Template ----------*/

// Types
export type NavSocialProps = {
	sectionTheme?: ThemeSection;
	className?: string;
};

// Default component
export default function NavSocial({ sectionTheme, className }: NavSocialProps) {
	/*----- Store -----*/

	// Redux state - tel
	const tel = useAppSelector((state) => state.manager.tel);

	// Redux state - email
	const email = useAppSelector((state) => state.manager.email);

	// Redux state - instagram
	const instagram = useAppSelector((state) => state.manager.instagram);

	// Redux state - tiktok
	const tiktok = useAppSelector((state) => state.manager.tiktok);

	/*----- Init -----*/

	// Declare navigation
	let navigation = [];

	// If tel...
	if (tel) {
		navigation.push({
			name: 'Phone',
			href: `tel:${tel}`,
			target: '_self',
			icon: () => <PhoneIcon className="w-7 h-7" />,
		});
	}

	// If email...
	if (email) {
		navigation.push({
			name: 'Email',
			href: `mailto:${email}`,
			target: '_self',
			icon: () => <EnvelopeIcon className="w-7 h-7" />,
		});
	}

	// If instagram...
	if (instagram) {
		navigation.push({
			name: 'Instagram',
			href: `${instagram}`,
			target: '_blank',
			icon: () => <IconInstagram className="w-6 h-6" />,
		});
	}

	// If tiktok...
	if (tiktok) {
		navigation.push({
			name: 'TikTok',
			href: `${tiktok}`,
			target: '_blank',
			icon: () => <IconTikTok className="w-6 h-6" />,
		});
	}

	// Return default
	return (
		<div className={classNames(`nav flex justify-center space-x-6`, className)}>
			{navigation.map((item) => (
				<Link
					className={classNames(
						`nav__link transform flex flex-col justify-center transition-transform duration-300 ease-in-out lg:hover:scale-110`
					)}
					key={item.name}
					href={item.href}
					target={item.target ?? null}
				>
					<span className="sr-only">{item.name}</span>
					<item.icon />
				</Link>
			))}
		</div>
	);
}
