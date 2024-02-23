// Component: SectionBody
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
import TextWrapper from '@/components/singles/Text/TextWrapper';
import TextTitle from '@/components/singles/Text/TextTitle';
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import TextBody from '@/components/singles/Text/TextBody';
import ButtonWrapper from '@/components/singles/Button/ButtonWrapper';
import PatternImage from '@/components/singles/Pattern/PatternImage';
import AosWrapper from '@/components/utility/Aos/AosWrapper';
import ImageBuilder from '@/components/utility/Image/ImageBuilder';
import SectionWrapper from './_partials/SectionWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'SectionBody';

/*---------- Component ----------*/

// Typings
type SectionBodyProps = {
	idx?: number;
	settings?: BlockBody;
	className?: string;
};

// Default component
export default function SectionBody({
	idx = 0,
	settings,
	className,
}: SectionBodyProps) {
	/*----- Init -----*/

	// Switch - component
	switch (settings?.component ?? 'default') {
		// case 'section-body-2':
		// 	return <SectionBody2 idx={idx} settings={settings} className={className} />;

		case 'section-body-1':
		default:
			return (
				<SectionBody1 idx={idx} settings={settings} className={className} />
			);
	}
}

// Section Body #1
export function SectionBody1({
	idx = 0,
	settings,
	className,
}: SectionBodyProps) {
	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper
			idx={idx}
			className={classNames(`section`, className)}
			theme={settings?.theme ?? 'default'}
			paddingTop={settings?.paddingTop ?? true}
			paddingContainer={settings?.paddingContainer ?? true}
			paddingBottom={settings?.paddingBottom ?? true}
			name={name}
		>
			<div
				className={classNames(
					`section__row grid grid-flow-dense grid-cols-1 gap-6 sm:gap-12 lg:grid-cols-2 lg:gap-20`
				)}
			>
				{settings?.image && (
					<div
						className={classNames(
							`section__col flex flex-col justify-center`,
							settings?.isFlipped && 'lg:col-start-2'
						)}
					>
						<div className="section__image relative pr-6 pb-6">
							<div className="section__image-bg absolute z-10 top-0 left-0 w-full h-full pl-6 pt-6 pointer-events-none">
								<PatternImage
									className="block w-full h-full"
									sectionTheme={settings?.theme}
								/>
							</div>

							<AosWrapper
								className="relative z-20"
								animation="fade-up-left"
								delay={0.1}
								duration={0.2}
							>
								<ImageBuilder
									className={classNames(
										`section__image-img w-full rounded-md object-cover object-center`
									)}
									image={settings.image}
								/>
							</AosWrapper>
						</div>
					</div>
				)}

				<div
					className={classNames(
						`section__col flex flex-col justify-center space-y-12`,
						settings?.image ? 'lg:text-left' : 'lg:col-span-2',
						settings?.image && settings?.isFlipped && 'lg:col-start-1'
					)}
				>
					{(settings?.title || settings?.subtitle || settings?.body) && (
						<TextWrapper
							className={classNames(
								!settings?.image && 'max-w-screen-md mx-auto'
							)}
						>
							{settings?.subtitle && (
								<TextSubtitle
									Tag={'h3'}
									text={settings.title}
									themeSection={settings?.theme}
								/>
							)}
							{settings?.title && (
								<TextTitle
									Tag={'h2'}
									text={settings.title}
									themeSection={settings?.theme}
								/>
							)}
							{settings?.body && <TextBody text={settings.body} />}
						</TextWrapper>
					)}

					{settings?.buttons && settings.buttons.length > 0 && (
						<AosWrapper animation="fade-up" delay={0.3}>
							<ButtonWrapper
								buttons={settings.buttons}
								themeSection={settings?.theme ?? 'default'}
							/>
						</AosWrapper>
					)}
				</div>
			</div>
		</SectionWrapper>
	);
}

// Section Body #2
// ...
