// Component: LayoutRoot
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
import { configShop } from '@/data/config';
import { staticMeta } from '@/data/content';

// Scripts (node)
import type { Metadata } from 'next';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
import TheProviderRedux from '@/components/base/TheProviderRedux';
import TheProviderTheme from '@/components/base/TheProviderTheme';
import TheIntro from '@/components/base/TheIntro';
import TheMenu from '@/components/base/TheMenu';
import TheCart from '@/components/base/TheCart';
import TheHeader from '@/components/base/TheHeader';
import TheFooter from '@/components/base/TheFooter';

// Fonts
import { Anton, Permanent_Marker, Rubik } from 'next/font/google';

// Styles
import '@/styles/globals.scss';
import TheProviderModal from '@/components/base/TheProviderModal';

/*---------- Static Data ----------*/

// Name
const name = 'LayoutRoot';

// Fonts
const fontTitle = Anton({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-title',
});
const fontSubtitle = Permanent_Marker({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-subtitle',
});
const fontButton = Permanent_Marker({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-button',
});
const fontBody = Rubik({
	subsets: ['latin'],
	variable: '--font-body',
});

// Metsdata
export const metadata: Metadata = staticMeta;

/*---------- Component ----------*/

// Typings
export type RootLayoutProps = {
	children: React.ReactNode;
};

// Default component
export default function RootLayout({ children }: RootLayoutProps) {
	/*----- Init -----*/

	// Return default
	return (
		<html lang="en">
			<body
				className={classNames(
					`body font-body font-base text-[17px] text-center`,
					fontTitle.variable,
					fontSubtitle.variable,
					fontButton.variable,
					fontBody.variable
				)}
			>
				<TheProviderRedux>
					<TheProviderTheme>
						<div
							className="layout antialiased bg-white text-black"
							data-name={name}
						>
							<TheProviderModal className="z-100">
								<TheIntro className="z-90" />
								<TheMenu className="z-50" />
								{configShop.useCart && <TheCart className="z-50" />}
								<TheHeader className="z-40" />
								<main className="layout__main relative z-10">{children}</main>
								<TheFooter className="z-10" />
							</TheProviderModal>
						</div>
					</TheProviderTheme>
				</TheProviderRedux>
			</body>
		</html>
	);
}
