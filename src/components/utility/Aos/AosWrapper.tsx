// Component: AosWrapper
/*----------------------------------------------------------------------------------------------------
* If intro has completed, loader is not showing, and element is in view... animate children
----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Scripts (node)
import { useRef, useState, useEffect } from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useAppSelector } from '@/redux';

// Components (node)
import { AnimatePresence, usePresence, motion } from 'framer-motion';
import { Freeze } from 'react-freeze';

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'AosWrapper';

// Motion

type animArgs = {
	animation?: ThemeAosAnimation;
	duration?: number;
	ease?: string;
	delay?: number;
};
const animTranslateY = 50;
const animParent = {
	initial: (args?: animArgs) => {
		// Switch - animation
		switch (args?.animation ?? 'fade') {
			// Fade Up
			case 'fade-up':
				return {
					opacity: 0,
					transform: `translateY(${animTranslateY}px)`,
				};

			// Fade Up Left
			case 'fade-up-left':
				return {
					opacity: 0,
					transform: `translate(1.5rem, 1.5rem)`,
				};

			// Fade
			case 'fade':
				return {
					opacity: 0,
				};

			// Default
			default:
				return {};
		}
	},
	animate: (args?: animArgs) => {
		// Switch - animation
		switch (args?.animation ?? 'fade') {
			// Fade Up
			case 'fade-up':
				return {
					opacity: 1,
					transform: `translateY(0px)`,
					transition: {
						duration: args?.duration ?? 0.6,
						ease: args?.ease ?? 'easeInOut',
						delay: args?.delay ?? 0,
					},
				};

			// Fade Up Left
			case 'fade-up-left':
				return {
					opacity: 1,
					transform: `translate(0px, 0px)`,
					transition: {
						duration: args?.duration ?? 0.6,
						ease: args?.ease ?? 'easeInOut',
						delay: args?.delay ?? 0,
					},
				};

			// Fade
			case 'fade':
				return {
					opacity: 1,
					transition: {
						duration: args?.duration ?? 0.6,
						ease: args?.ease ?? 'easeInOut',
						delay: args?.delay ?? 0,
					},
				};

			// Default
			default:
				return {};
		}
	},
	exit: (args?: animArgs) => {
		// Switch - animation
		switch (args?.animation ?? 'fade') {
			// Fade Up
			case 'fade-up':
				return {
					opacity: 0,
					transform: `translateY(${animTranslateY}px)`,
					transition: {
						duration: args?.duration ?? 0.6,
						ease: args?.ease ?? 'easeInOut',
						delay: args?.delay ?? 0,
					},
				};

			// Fade Up
			case 'fade-up-left':
				return {
					opacity: 0,
					transform: `translate(1.5rem, 1.5rem)`,
					transition: {
						duration: args?.duration ?? 0.6,
						ease: args?.ease ?? 'easeInOut',
						delay: args?.delay ?? 0,
					},
				};

			// Fade
			case 'fade':
				return {
					opacity: 0,
					transition: {
						duration: args?.duration ?? 0.6,
						ease: args?.ease ?? 'easeInOut',
						delay: args?.delay ?? 0,
					},
				};

			// Default
			default:
				return {};
		}
	},
};

/*---------- Component ----------*/

// Typings
type AosWrapperProps = {
	isActive?: boolean;
	isStateful?: boolean;
	animation?: ThemeAosAnimation;
	duration?: number;
	delay?: number;
	ease?: ThemeAosEase;
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
};

// Default component
export default function AosWrapper({
	isActive = true,
	isStateful = false,
	animation,
	duration = 0.6,
	delay = 0,
	ease = 'easeInOut',
	className,
	style = {},
	children,
}: AosWrapperProps) {
	/*----- Refs -----*/

	// Ref - parentEl
	const parentEl = useRef<HTMLDivElement>(null);

	// Ref - timeoutDelay
	const timeoutDelay = useRef<NodeJS.Timeout | null>(null);

	/*----- Store -----*/

	// State - isInView
	const [isInView, setIsInView] = useState<boolean>(false);

	// State - isVisable
	const [isVisable, setIsVisable] = useState<boolean>(false);

	// State - isAnimated
	const [isAnimated, setIsAnimated] = useState<boolean>(false);

	// Redux state - isShowingIntro
	const isShowingIntro = useAppSelector(
		(state) => state.manager.isShowingIntro
	);

	// Redux state - isShowingLoader
	const isShowingLoader = useAppSelector(
		(state) => state.manager.isShowingLoader
	);

	// Redux state - isScrolled
	const isScrolled = useAppSelector((state) => state.manager.isScrolled);

	// Redux state - isResized
	const isResized = useAppSelector((state) => state.manager.isResized);

	/*----- Lifecycle -----*/

	// Watch - isShowingIntro / isShowingLoader
	useEffect(() => {
		// If isVisable...
		if (!isShowingIntro && !isShowingLoader) {
			// If timeoutDelay does not exist...
			if (!timeoutDelay.current) {
				// Set timeoutDelay
				timeoutDelay.current = setTimeout(() => {
					// Set isVisable to false
					setIsVisable(true);
				}, delay * 1000);
			}
		} else {
			// If timeoutDelay exists...
			if (timeoutDelay.current) {
				// Clear timeoutDelay
				if (timeoutDelay.current) {
					clearTimeout(timeoutDelay.current);
					timeoutDelay.current = null;
				}
			}

			// Set isVisable to false
			setIsVisable(false);
		}
	}, [delay, isShowingIntro, isShowingLoader]);

	// Watch - isScrolled / isResized
	useEffect(() => {
		// Get bounding client rect
		const rect = parentEl.current?.getBoundingClientRect();

		// Set isInView
		if (rect) {
			setIsInView(rect.top <= window.innerHeight);
		}
	}, [isScrolled, isResized]);

	// Watch - isInView / isVisable
	useEffect(() => {
		// If isInView and isVisable and isVisableDelayed...
		if (isInView && isVisable) {
			// Set isAnimated to true
			setIsAnimated(true);
		} else {
			// Set isAnimated to false
			setIsAnimated(false);
		}
	}, [isInView, isVisable]);

	/*----- Init -----*/

	// Use presence
	const [isPresent, safeToRemove] = usePresence();

	// If stateful...
	if (isStateful) {
		return (
			<div
				ref={parentEl}
				className={classNames(`aos-wrapper group is-animated`, className)}
			>
				<AnimatePresence mode="wait">
					{isActive && isAnimated && (
						<motion.div
							initial="initial"
							animate={isActive && isAnimated ? 'animate' : 'exit'}
							exit={isActive && isAnimated ? 'animate' : 'exit'}
							variants={animParent}
							custom={{
								animation,
								duration,
								delay,
								ease,
							}}
							onAnimationComplete={() => {
								if (!isPresent) safeToRemove();
							}}
							data-name={name}
						>
							<Freeze freeze={!isPresent}>{children}</Freeze>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		);
	}

	// Return default
	return (
		// Static animation
		<motion.div
			ref={parentEl}
			className={classNames(
				`aos group`,
				isActive && isAnimated ? 'is-animated' : 'pointer-events-none',
				className
			)}
			initial="initial"
			animate={isActive && isAnimated ? 'animate' : 'exit'}
			exit={isActive && isAnimated ? 'animate' : 'exit'}
			variants={animParent}
			custom={{
				animation,
				ease: 'easeInOut',
				delay,
			}}
			data-name={name}
		>
			{children}
		</motion.div>
	);
}
