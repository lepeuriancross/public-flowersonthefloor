// Component: TextSpanEmail
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

// Components (local)
// ...

/*---------- Component ----------*/

// Typings
type TextSpanEmailProps = {
	className?: string;
};

// Default component
export default function TextSpanEmail({ className }: TextSpanEmailProps) {
	/*----- Store -----*/

	// Redux state - email
	const email = useAppSelector((state) => state.manager.email);

	/*----- Init -----*/

	// Return default
	return (
		<span className={classNames(`text`, className)}>
			<Link className="hover:underline" href={`mailto:${email}`}>
				{email}
			</Link>
		</span>
	);
}
