// Component: TheManager
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
import { configUI } from '@/data/config';

// Data
// ...

// Scripts (node)
import { useEffect, useLayoutEffect } from 'react';
import { useTheme } from 'next-themes';
import { useDispatch } from 'react-redux';

// Scripts (local)
import { AppDispatch, useAppSelector } from '@/redux';
import {
	// Layout
	setIsScrolled,
	setIsResized,
	setIsShowingMenu,
	setIsDarkMode,
	// Metadata
	setMetaTitle,
	// Header
	setHeaderTheme,
	// Contact
	setContactTel,
	setContactEmail,
	setContactInstagram,
	setContactTikTok,
	// Navigation
	setNavHomeSlug,
	setNavHeader,
	setNavFooter,
} from '@/redux/slices/sliceManager';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'TheManager';

/*---------- Component ----------*/

// Typings
export interface TheManagerProps {
	result?: SanityResult;
}

// Default component
export default function TheManager({ result }: TheManagerProps) {
	/*----- Store -----*/

	// State - theme
	const { theme, setTheme } = useTheme();

	// Redux state - isShowingIntro
	const isShowingIntro = useAppSelector(
		(state) => state.manager.isShowingIntro
	);

	// Redux state - isShowingLoader
	const isShowingLoader = useAppSelector(
		(state) => state.manager.isShowingLoader
	);

	// Redux state - isShowingMenu
	const isShowingMenu = useAppSelector((state) => state.manager.isShowingMenu);

	// Redux state - isDarkMode
	const isDarkMode = useAppSelector((state) => state.manager.isDarkMode);

	// Declare dispatch
	const dispatch = useDispatch<AppDispatch>();

	/*----- Lifecycle -----*/

	// Watch - dispatch
	useEffect(() => {
		// Dispatch - isDarkMode
		dispatch(
			setIsDarkMode(
				configUI.darkMode === 'light'
					? false
					: configUI.darkMode === 'dark'
					? true
					: window
					? window.matchMedia &&
					  window.matchMedia('(prefers-color-scheme: dark)').matches
					: false
			)
		);
	}, [dispatch]);

	// Watch - scroll
	function useScroll() {
		// Layout Effect - update scroll
		const remove = useLayoutEffect(() => {
			// Function - handle scroll
			function handleScroll() {
				// Dispatch - setIsScrolled
				dispatch(setIsScrolled(window.scrollY));

				// Get sectionEls
				const sectionEls = document.querySelectorAll('.section-wrapper');

				// Query section (if any) which is overlapping the top of the viewport
				if (sectionEls && sectionEls.length > 0) {
					const sectionClosest = [...sectionEls].reduce((prev, curr) =>
						Math.abs(
							curr.getBoundingClientRect().top + window.innerHeight / 2
						) <
						Math.abs(prev.getBoundingClientRect().top + window.innerHeight / 2)
							? curr
							: prev
					);

					// Set - headerTheme
					console.log(
						'header theme',
						sectionClosest.getAttribute('data-theme')
					);
					dispatch(
						setHeaderTheme(
							sectionClosest.getAttribute('data-theme') ?? 'default'
						)
					);
				}
			}

			// Add listener - window scroll
			window.addEventListener('scroll', handleScroll);

			// Init
			handleScroll();

			// Return - remove event listeners
			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}, []);

		// Return
		return remove;
	}
	useScroll();

	// Watch - resize
	function useResize() {
		// Layout Effect - update resize
		const remove = useLayoutEffect(() => {
			// Function - handle resize
			function handleResize() {
				// Dispatch - setIsResized
				dispatch(setIsResized([window.innerWidth, window.innerHeight]));

				// Dispatch - setIsShowingMenu
				dispatch(setIsShowingMenu(false));
			}

			// Add listener - window resize
			window.addEventListener('resize', handleResize);

			// Init
			handleResize();

			// Return - remove event listeners
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}, []);

		// Return
		return remove;
	}
	useResize();

	// Watch - result, dispatch
	useEffect(() => {
		console.log('result', result);

		// If title...
		if (result?.mainSettings?.title && result.mainSettings.title !== '') {
			dispatch(setMetaTitle(result.mainSettings.title));
		}

		// If tel...
		if (result?.mainSettings?.tel) {
			// Dispatch - setContactTel
			dispatch(setContactTel(result.mainSettings.tel));
		}

		// If email...
		if (result?.mainSettings?.email) {
			// Dispatch - setContactEmail
			dispatch(setContactEmail(result.mainSettings.email));
		}

		// If instagram...
		if (result?.mainSettings?.instagram) {
			// Dispatch - setContactInstagram
			dispatch(setContactInstagram(result.mainSettings.instagram));
		}

		// If tiktok...
		if (result?.mainSettings?.tiktok) {
			// Dispatch - setContactTikTok
			dispatch(setContactTikTok(result.mainSettings.tiktok));
		}

		// If homepage...
		if (result?.mainSettings?.homepage?.slug?.current) {
			// Dispatch - setNavHomeSlug
			dispatch(setNavHomeSlug(result.mainSettings.homepage.slug.current));
		}

		// If items...
		if (result?.mainSettings?.navHeader) {
			// Dispatch - setNavHeader
			dispatch(setNavHeader(result.mainSettings.navHeader));
		}

		// If navFooter...
		if (result?.mainSettings?.navFooter) {
			// Dispatch - setNavFooter
			dispatch(setNavFooter(result.mainSettings.navFooter));
		}
	}, [result, dispatch]);

	// Watch - isShowingIntro, isShowingLoader, isShowingMenu
	useEffect(() => {
		// If showing intro, loader or menu...
		if (isShowingIntro || isShowingLoader || isShowingMenu) {
			// Prevent window scroll
			document.body.style.overflow = 'hidden';
		} else {
			// Allow window scroll
			document.body.style.overflow = 'auto';
		}

		// If showing intro or loader...
		if (isShowingIntro || isShowingLoader) {
			// Prevent interaction
			document.body.style.pointerEvents = 'none';

			// Set window scrollY to 0
			window.scrollTo(0, 0);
		} else {
			// Allow interaction
			document.body.style.pointerEvents = 'auto';
		}
	}, [isShowingIntro, isShowingLoader, isShowingMenu]);

	// Watch - isDarkMode, setTheme
	useEffect(() => {
		// Set Theme
		setTheme(isDarkMode ? 'dark' : 'light');
	}, [isDarkMode, setTheme]);

	/*----- Init -----*/

	// Return default
	return null;
}
