// Component: SectionWrapper
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import Image from 'next/image';

// Components (local)
// ...

// Images
import imgTextureGrainy from '../../../../public/img/texture/texture_grainy.jpg';

/*---------- Static Data ----------*/

// Name
const defaultName = 'SectionWrapper';

/*---------- Component ----------*/

// Typings
export type SectionWrapperProps = {
	idx?: number;
	name?: string;
	theme?: ThemeSection;
	paddingTop?: boolean;
	paddingContainer?: boolean;
	paddingBottom?: boolean;
	className?: string;
	background?: React.ReactNode;
	children?: React.ReactNode;
	foreground?: React.ReactNode;
};

// Default component
export default function SectionWrapper({
	idx = 0,
	name = defaultName,
	theme,
	paddingTop = true,
	paddingContainer = true,
	paddingBottom = true,
	className,
	foreground,
	children,
	background,
}: SectionWrapperProps) {
	// Return default
	return (
		<section
			className={classNames(
				'relative flex flex-col justify-center items-center w-screen overflow-hidden',
				theme === 'primary'
					? 'bg-primary text-white'
					: theme === 'secondary'
					? 'bg-secondary text-white'
					: theme === 'black'
					? 'bg-black text-white'
					: 'bg-white text-black',
				className
			)}
			data-name={name}
		>
			{(theme === 'primary' || theme === 'secondary') && (
				<Image
					className="section__texture absolute top-0 left-0 w-full h-full object-cover opacity-10 pointer-events-none"
					src={imgTextureGrainy.src}
					width={imgTextureGrainy.width}
					height={imgTextureGrainy.height}
					alt=""
				/>
			)}
			{background && (
				<div className="section__bg absolute z-10 top-0 left-0 w-full h-full pointer-events-none">
					{background}
				</div>
			)}
			<div
				className={classNames(
					`section__container flex flex-col justify-center items-center relative z-20 w-full grow`,
					paddingTop && (idx === 0 ? 'pt-40' : 'pt-24'),
					paddingContainer && 'px-6',
					paddingBottom && 'pb-24'
				)}
			>
				<div
					className={classNames(
						`section__container-inner z-20 mx-auto`,
						paddingContainer && 'container'
					)}
				>
					{children}
				</div>
			</div>
			{foreground && (
				<div className="section__fg absolute z-30 top-0 left-0 w-full h-full pointer-events-none">
					{foreground}
				</div>
			)}
		</section>
	);
}
