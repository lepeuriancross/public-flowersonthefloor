// Compoent: TheIntro
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Scripts (local)
import { classNames, arShuffle } from '@/lib/utils';
import { AppDispatch, useAppSelector } from '@/redux';
import { setIsShowingIntro } from '@/redux/slices/sliceManager';

// Components (node)
import Image from 'next/image';

// Components (local)
import { AnimatePresence, usePresence, motion } from 'framer-motion';
import { Freeze } from 'react-freeze';

// Images
import imgTextureGrainy from '../../../public/img/texture/texture_grainy.jpg';
import imgIntro1 from '../../../public/img/photo/photo_intro-1.jpg';
import imgIntro2 from '../../../public/img/photo/photo_intro-2.jpg';
import imgIntro3 from '../../../public/img/photo/photo_intro-3.jpg';
import imgIntro4 from '../../../public/img/photo/photo_intro-4.jpg';
import imgIntro5 from '../../../public/img/photo/photo_intro-5.jpg';
import imgIntro6 from '../../../public/img/photo/photo_intro-6.jpg';
import imgLogoOuter from '../../../public/img/logo/logo_outer.png';
import imgLogoInner from '../../../public/img/logo/logo_inner.png';

/*---------- Static Data ----------*/

// Name
const name = 'TheIntro';

// Images
const images = arShuffle([
	imgIntro1,
	imgIntro2,
	imgIntro3,
	imgIntro4,
	imgIntro5,
	imgIntro6,
]);

// Motion
const animBackground = {
	initial: {
		opacity: 1,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
		},
	},
};
const animLogoInner = {
	initial: {
		transform: 'translate(-50%, -50%)scale(0)',
	},
	animate: {
		transform: 'translate(-50%, -50%) scale(1)',
		transition: {
			duration: 0.2,
			ease: 'easeInOut',
			delay: 0.1,
		},
	},
	exit: {
		transform: 'translate(-50%, -50%)scale(0)',
		transition: {
			duration: 0.2,
			ease: 'easeInOut',
			delay: 0,
		},
	},
};
const animLogoOuter = {
	initial: {
		transform: 'translate(-50%, -50%)scale(0)',
	},
	animate: {
		transform: 'translate(-50%, -50%) scale(1)',
		transition: {
			duration: 0.2,
			ease: 'easeInOut',
			delay: 0,
		},
	},
	exit: {
		transform: 'translate(-50%, -50%)scale(0)',
		transition: {
			duration: 0.2,
			ease: 'easeInOut',
			delay: 0.1,
		},
	},
};

/*---------- Component ----------*/

// Typings
type TheIntroProps = {
	className?: string;
};

// Default component
export default function TheIntro({ className }: TheIntroProps) {
	/*----- Store -----*/

	// State - backgroundIsVisible
	const [backgroundIsVisible, setBackgroundIsVisible] = useState<boolean>(true);

	// State - logoIsVisible
	const [logoIsVisible, setLogoIsVisible] = useState<boolean>(true);

	// Redux state - isShowingIntro
	const isShowingIntro = useAppSelector(
		(state) => state.manager.isShowingIntro
	);

	// State - currentImage
	const [currentImage, setCurrentImage] = useState<number>(-1);

	// Redux dispatch
	const dispatch = useDispatch<AppDispatch>();

	/*----- Lifecycle -----*/

	// On mount...
	useEffect(() => {
		// Set timeout - showBackground
		const showBackground = setTimeout(() => {
			// Show background
			setBackgroundIsVisible(true);
		}, 0);

		// Set timeout - showLogo
		const showLogo = setTimeout(() => {
			// Show logo
			setLogoIsVisible(true);
		}, 300);

		// Set timeout - hideLogo
		const hideLogo = setTimeout(() => {
			// Hide logo
			setLogoIsVisible(false);
		}, 2000);

		// Set timeout - hideBackground
		const hideBackground = setTimeout(() => {
			// Hide logo
			setBackgroundIsVisible(false);
		}, 2300);

		// Set timeout - hideIntro
		const hideIntro = setTimeout(() => {
			// Dispatch - setIsShowingIntro
			dispatch(setIsShowingIntro(false));
		}, 2600);

		// Return cleanup
		return () => {
			// Clear timeouts
			clearTimeout(showBackground);
			clearTimeout(showLogo);
			clearTimeout(hideLogo);
			clearTimeout(hideBackground);
			clearTimeout(hideIntro);
		};
	}, []);

	// Watch - currentImage
	useEffect(() => {
		// Set interval
		const interval = setInterval(() => {
			// Increment currentImage (loops back to 0)
			setCurrentImage((currentImage) =>
				isShowingIntro
					? currentImage < images.length - 1
						? currentImage + 1
						: 0
					: currentImage
			);
		}, 200);

		// Return - clear interval
		return () => clearInterval(interval);
	}, [currentImage, isShowingIntro]);

	/*----- Init -----*/

	// Use presence
	const [isPresent, safeToRemove] = usePresence();

	// Return default
	return (
		<div
			className={classNames(
				`intro fixed top-0 left-0 w-full h-full text-white`,
				!isShowingIntro && 'pointer-events-none',
				className
			)}
			data-name={name}
		>
			<AnimatePresence mode="wait">
				{backgroundIsVisible && (
					<motion.div
						className={classNames(
							`intro__background absolute z-10 top-0 left-0 w-full h-screen`
						)}
						{...animBackground}
						onAnimationComplete={() => {
							if (!isPresent) safeToRemove();
						}}
					>
						<Freeze freeze={!isPresent}>
							<div
								className={classNames(
									`intro__background-container absolute top-0 left-0 w-full h-screen bg-primary`
								)}
							>
								<Image
									className="intro__background-texture absolute z-10 top-0 left-0 w-full h-full object-cover opacity-10"
									src={imgTextureGrainy.src}
									width={imgTextureGrainy.width}
									height={imgTextureGrainy.height}
									alt=""
									priority={true}
								/>
								{images.map((image, i) => (
									<Image
										key={`the-intro-bg-image-${i}`}
										className={classNames(
											`intro__background-image absolute z-20 top-0 left-0 w-full h-full object-cover object-center opacity-80`,
											i === currentImage ? '' : 'hidden'
										)}
										src={image.src}
										width={1920}
										height={1080}
										alt=""
										priority={true}
									/>
								))}
							</div>
						</Freeze>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence mode="wait">
				{logoIsVisible && (
					<motion.div
						className="intro__logo-outer absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] min-w-[120px] min-h-[120px] max-w-[300px] max-h-[300px]"
						{...animLogoOuter}
						onAnimationComplete={() => {
							if (!isPresent) safeToRemove();
						}}
					>
						<Freeze freeze={!isPresent}>
							<Image
								src={imgLogoOuter.src}
								width={imgLogoOuter.width}
								height={imgLogoOuter.height}
								alt=""
								priority={true}
							/>
						</Freeze>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence mode="wait">
				{logoIsVisible && (
					<motion.div
						className="intro__logo-outer absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] min-w-[120px] min-h-[120px] max-w-[300px] max-h-[300px]"
						{...animLogoInner}
						onAnimationComplete={() => {
							if (!isPresent) safeToRemove();
						}}
					>
						<Freeze freeze={!isPresent}>
							<Image
								src={imgLogoInner.src}
								width={imgLogoOuter.width}
								height={imgLogoOuter.height}
								alt=""
								priority={true}
							/>
						</Freeze>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
