// Component: Countdown
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useState, useEffect } from 'react';

// Scripts (local)
import { classNames, numPad } from '@/lib/utils';
import IconSpinner from '../Icon/IconSpinner';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'Countdown';

/*---------- Component ----------*/

// Typings
type CountdownProps = {
	publishedAt?: string;
	expiresAt?: string;
	className?: string;
};

// Default component
export default function Countdown({
	publishedAt,
	expiresAt,
	className,
}: CountdownProps) {
	/*----- Store -----*/

	// State - currentStatus
	const [currentStatus, setCurrentStatus] = useState<
		'idle' | 'countdown' | 'published' | 'expired'
	>('idle');

	// State - timeReadable
	const [timeReadable, setTimeReadable] = useState<string>('');

	/*----- Lifecycle -----*/

	// Watch - publishedAt, expiresAt, currentStatus
	useEffect(() => {
		// Function - tick
		const tick = () => {
			if (publishedAt && expiresAt) {
				// Get time until publishedAt
				const timeUntilPublished =
					new Date(publishedAt as string).getTime() - new Date().getTime();

				// Get time until expiresAt
				const timeUntilExpired =
					new Date(expiresAt as string).getTime() - new Date().getTime();

				// If timeUntilPublished is positive...
				if (timeUntilPublished > 0) {
					// Set currentStatus
					currentStatus !== 'countdown' && setCurrentStatus('countdown');

					// Get timeUntilPublished as days, hours, minutes, seconds
					const days = Math.floor(timeUntilPublished / (1000 * 60 * 60 * 24));
					const hours = Math.floor(
						(timeUntilPublished % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
					);
					const minutes = Math.floor(
						(timeUntilPublished % (1000 * 60 * 60)) / (1000 * 60)
					);
					const seconds = Math.floor((timeUntilPublished % (1000 * 60)) / 1000);

					// Create time as readable string
					const timeStr = `${days > 0 ? numPad(days, 2) + 'd' : ''} ${
						numPad(hours, 2) + 'h'
					} ${numPad(minutes, 2) + 'm'} ${seconds + 's'}`;

					// Set timeReadable
					setTimeReadable(timeStr);
				}

				// If timeUntilExpired is positive, but timeUntilPublished is negative...
				else if (timeUntilExpired > 0 && timeUntilPublished < 0) {
					// Set currentStatus
					currentStatus !== 'published' && setCurrentStatus('published');

					// Get timeUntilExpired as days, hours, minutes, seconds
					const days = Math.floor(timeUntilExpired / (1000 * 60 * 60 * 24));
					const hours = Math.floor(
						(timeUntilExpired % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
					);
					const minutes = Math.floor(
						(timeUntilExpired % (1000 * 60 * 60)) / (1000 * 60)
					);
					const seconds = Math.floor((timeUntilExpired % (1000 * 60)) / 1000);

					// Create time as readable string
					const timeStr = `${days > 0 ? numPad(days, 2) + 'd' : ''} ${
						numPad(hours, 2) + 'h'
					} ${numPad(minutes, 2) + 'm'} ${seconds + 's'}`;

					// Set timeReadable
					setTimeReadable(timeStr);
				}

				// If timeUntilExpired is negative...
				else if (timeUntilExpired < 0) {
					// Set currentStatus
					currentStatus !== 'expired' && setCurrentStatus('expired');

					// Clear interval
					clearInterval(interval);
				}
			}
		};

		// Set interval
		const interval = setInterval(tick, 1000);

		// Init
		tick();

		// Return cleanup
		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [publishedAt, expiresAt, currentStatus]);

	/*----- Init -----*/

	// Return default
	return (
		<>
			{currentStatus === 'countdown' || 'published' ? (
				<span className={classNames(`countdown`, className)}>
					{timeReadable}
				</span>
			) : (
				<IconSpinner className="w-6 h-6" />
			)}
		</>
	);
}
