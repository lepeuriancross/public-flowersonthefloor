// Component: LogoHeader
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
import Image from 'next/image';

// Components (local)
// ...

// Images
import imgLogoOuter from '../../../../public/img/logo/logo_outer.png';
import imgLogoInner from '../../../../public/img/logo/logo_inner.png';
import Link from 'next/link';

/*---------- Static Data ----------*/

// Name
const name = 'LogoHeader';

/*---------- Component ----------*/

// Typings
export type LogoHeaderProps = {
	className?: string;
};

// Default component
export default function LogoHeader({ className }: LogoHeaderProps) {
	/*----- Store -----*/

	// Redux state - isScrolled
	const isScrolled = useAppSelector((state) => state.manager.isScrolled);

	/*----- Init -----*/

	// Return default
	return (
		<div
			className={classNames(
				`logo relative h-[50px] w-[50px]`,
				isScrolled &&
					' lg:transform lg:transition-transform lg:duration-300 lg:ease-out lg:hover:scale-110',
				className
			)}
			data-name={name}
		>
			<Link href="/">
				<span
					className={classNames(
						`logo__outer absolute z-10 inline-block rounded-full transform transition-all duration-300 ease-out w-[235%] h-[235%]`,
						isScrolled
							? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0'
							: 'top-0 left-0 translate-x-0 translate-y-0'
					)}
				>
					<Image
						className="logo__outer-img width-full h-full"
						src={imgLogoOuter.src}
						alt=""
						width={imgLogoOuter.width}
						height={imgLogoOuter.height}
					/>
				</span>
				<span
					className={classNames(
						`logo__inner absolute z-20 inline-block rounded-full transform transition-all duration-300 ease-out w-[235%] h-[235%]`,
						isScrolled
							? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
							: 'top-0 left-0 translate-x-0 translate-y-0'
					)}
				>
					<Image
						className="logo__inner-img width-full h-full"
						src={imgLogoInner.src}
						alt=""
						width={imgLogoInner.width}
						height={imgLogoInner.height}
					/>
				</span>
			</Link>
		</div>
	);
}
