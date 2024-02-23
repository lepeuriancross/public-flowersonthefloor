// Component: SliderReviews
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Typings
// ...

// Data
// ...

// Scripts (node)
import { Children, useRef, useState, useEffect } from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useAppSelector } from '@/redux';

// Components (node)
import {
	ArrowSmallLeftIcon,
	ArrowSmallRightIcon,
} from '@heroicons/react/20/solid';

// Components (local)
import Button from '@/components/singles/Button/Button';

/*---------- Static Data ----------*/

// Name
const name = 'SliderReviews';

/*---------- Template ----------*/

// Typings
export type SliderReviewsProps = {
	isLooping?: boolean;
	delay?: number;
	arrows?: boolean;
	dots?: boolean;
	themeSection?: ThemeSection;
	className?: string;
	children?: React.ReactNode;
};

// Default component
export default function SliderReviews({
	isLooping = true,
	delay = 100,
	arrows = false,
	dots = false,
	themeSection = 'default',
	className,
	children,
}: SliderReviewsProps) {
	/*----- Dynamic Data -----*/

	// Get arrayChildren
	const arrayChildren = Children.toArray(children);

	/*----- Refs -----*/

	// Ref - parentEl
	const parentEl = useRef<HTMLDivElement>(null);

	// Ref - timeoutDelay
	const timeoutDelay = useRef<NodeJS.Timeout | null>(null);

	// Ref - counterPaused
	const counterPaused = useRef<number>(0);

	// Ref - slideEls
	const slideEls = useRef<HTMLDivElement[]>([]);

	/*----- Store -----*/

	// State - isInView
	const [isInView, setIsInView] = useState<boolean>(false);

	// State - isVisable
	const [isVisable, setIsVisable] = useState<boolean>(false);

	// State - isAnimated
	const [isAnimated, setIsActive] = useState<boolean>(false);

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

	// Local state - currentSlide
	const [currentSlide, setCurrentSlide] = useState(0);

	// Local state - slidesHeight
	const [slidesHeight, setSlidesHeight] = useState(0);

	/*----- Functions -----*/

	// Function - handleClickDot
	const handleClickDot = (idx: number) => {
		// Set currentSlide
		setCurrentSlide(idx);

		// Set slidesHeight
		setSlidesHeight(slideEls.current[idx]?.offsetHeight ?? 0);

		// Set counterPaused
		counterPaused.current = 10;
	};

	// Function - handleClickPrev
	const handleClickPrev = () => {
		// Get prevSlide
		const prevSlide =
			currentSlide - 1 < 0 ? arrayChildren.length - 1 : currentSlide - 1;

		// handleClickDot
		handleClickDot(prevSlide);

		// Set counterPaused
		counterPaused.current = 10;
	};

	// Function - handleClickNext
	const handleClickNext = () => {
		// Get nextSlide
		const nextSlide =
			currentSlide + 1 > arrayChildren.length - 1 ? 0 : currentSlide + 1;

		// handleClickDot
		handleClickDot(nextSlide);

		// Set counterPaused
		counterPaused.current = 10;
	};

	/*----- Lifecycle -----*/

	// On mount
	useEffect(() => {
		// Set slidesHeight
		setSlidesHeight(slideEls.current[0]?.offsetHeight ?? 0);
	}, []);

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
				}, delay);
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
		if (rect && parentEl.current) {
			setIsInView(rect.top <= window.innerHeight);
		}
	}, [isScrolled, isResized]);

	// Watch - isInView / isVisable
	useEffect(() => {
		// If isInView and isVisable and isVisableDelayed...
		if (isInView && isVisable) {
			// Set isAnimated to true
			setIsActive(true);
		} else {
			// Set isAnimated to false
			setIsActive(false);
		}
	}, [isInView, isVisable]);

	// Watch - isLooping / isAnimated / counterPaused / arrayChildren / currentSlide
	useEffect(() => {
		// Set intervalNext
		const intervalNext = setInterval(() => {
			// If isActive, isLooping and counterPaused is at 0...
			if (isLooping && isAnimated && counterPaused.current === 0) {
				// Get nextSlide
				const nextSlide =
					currentSlide + 1 > arrayChildren.length - 1 ? 0 : currentSlide + 1;

				// Set currentSlide
				setCurrentSlide(nextSlide);

				// Set slidesHeight
				setSlidesHeight(slideEls.current[nextSlide]?.offsetHeight ?? 0);
			}
		}, 5000);

		// Set intervalPause
		const intervalPause = setInterval(() => {
			// If counterPaused is greater than 0...
			if (counterPaused.current > 0) {
				// Decrement counterPaused
				counterPaused.current--;
			}
		}, 1000);

		// Return clear intervals
		return () => {
			clearInterval(intervalNext);
			clearInterval(intervalPause);
		};
	}, [isLooping, isAnimated, counterPaused, arrayChildren, currentSlide]);

	/*----- Init -----*/

	// Return default
	return (
		<div ref={parentEl} className={classNames(`slider space-y-12`, className)}>
			<div className="slider__row flex justify-center items-center md:space-x-20">
				{arrows && (
					<Button
						className="hidden md:inline-block"
						component="button-icon"
						text="Previous Review"
						icon={
							<ArrowSmallLeftIcon className="slider__arrow-left relative z-20 w-7 h-7" />
						}
						theme="block"
						themeSection={themeSection}
						onClick={() => {
							handleClickPrev();
						}}
					/>
				)}
				<div
					className="slider__slides relative z-10 grow overflow-hidden transition-all duration-300 ease-in-out"
					style={{
						height: `${slidesHeight}px`,
					}}
				>
					{arrayChildren.map((child, c) => (
						<div
							key={`slider-reviews-slide-${c}`}
							ref={(el: HTMLDivElement) => {
								slideEls.current[c] = el ?? null;
							}}
							className={classNames(
								`slider__slide absolute top-0 left-0 w-full transition-opacity duration-300 ease-in-out`,
								currentSlide === c ? 'opacity-100 delay-500' : 'opacity-0'
							)}
						>
							{child}
						</div>
					))}
				</div>
				{arrows && (
					<Button
						className="hidden md:inline-block"
						component="button-icon"
						text="Next Review"
						icon={
							<ArrowSmallRightIcon className="slider__arrow-right relative z-20 w-7 h-7" />
						}
						theme="block"
						themeSection={themeSection}
						onClick={() => {
							handleClickNext();
						}}
					/>
				)}
			</div>
			<div className="slider__row">
				<div className="slider__dots flex justify-center items-center space-x-2">
					{arrayChildren.map((child, c) => (
						<button
							key={`slider-reviews-slide-${c}`}
							className={classNames(
								`slider__dot w-3 h-3 rounded-full transition-opacity duration-500 ease-in-out`,
								themeSection === 'primary'
									? 'bg-primary'
									: themeSection === 'secondary'
									? 'bg-secondary'
									: themeSection === 'black'
									? 'bg-secondary'
									: 'bg-primary',
								currentSlide !== c && 'opacity-30 hover:opacity-100'
							)}
							type="button"
							onClick={() => {
								handleClickDot(c);
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
