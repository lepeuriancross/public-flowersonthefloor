// Component: SectionHero
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
import AosWrapper from '@/components/utility/Aos/AosWrapper';
import ImageBuilder from '@/components/utility/Image/ImageBuilder';
import SectionWrapper from './_partials/SectionWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'SectionHero';

/*---------- Component ----------*/

// Typings
type SectionHeroProps = {
	idx?: number;
	settings?: BlockHero;
	className?: string;
};

// Default component
export default function SectionHero({
	idx = 0,
	settings,
	className,
}: SectionHeroProps) {
	/*----- Init -----*/

	// Switch - component
	switch (settings?.component ?? 'default') {
		// case 'section-hero-2':
		// 	return <SectionHero2 idx={idx} settings={settings} className={className} />;

		case 'section-hero-1':
		default:
			return (
				<SectionHero1 idx={idx} settings={settings} className={className} />
			);
	}
}

// Section Hero #1
export function SectionHero1({
	idx = 0,
	settings,
	className,
}: SectionHeroProps) {
	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper
			idx={-1}
			className={classNames(`section min-h-screen`, className)}
			theme={settings?.theme ?? 'default'}
			paddingTop={settings?.paddingTop ?? true}
			paddingContainer={settings?.paddingContainer ?? true}
			paddingBottom={settings?.paddingBottom ?? true}
			name={name}
		>
			<div
				className={classNames(
					`section__row grid grid-flow-dense grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20`
				)}
			>
				<div
					className={classNames(
						`section__col flex flex-col justify-center`,
						settings?.paddingTop && '-mt-24',
						settings?.isFlipped && 'lg:col-start-2'
					)}
				>
					{settings?.images && settings.images.length > 1 ? (
						<div>[Carousel Coming Soon. Please stick to one image for now]</div>
					) : (
						settings?.images &&
						settings.images.length > 0 && (
							<div
								className={classNames(
									`-mx-6 lg:absolute lg:top-0 lg:w-[50vw] lg:h-full lg:mx-0`,
									settings?.isFlipped ? 'lg:left-1/2' : 'lg:left-0'
								)}
							>
								<ImageBuilder
									className={classNames(
										`section__img w-full h-full object-cover object-center lg:min-h-screen lg:max-h-screen`
									)}
									image={settings.images[0]}
								/>
							</div>
						)
					)}
				</div>
				<div
					className={classNames(
						`section__col flex flex-col justify-center space-y-12 lg:text-left`,
						settings?.isFlipped && 'lg:col-start-1'
					)}
				>
					{(settings?.title || settings?.subtitle || settings?.body) && (
						<TextWrapper>
							{settings?.subtitle && (
								<TextSubtitle
									Tag={'h3'}
									text={settings.subtitle}
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
								themeSection={settings?.theme}
							/>
						</AosWrapper>
					)}
				</div>
			</div>
		</SectionWrapper>
	);
}

// Section Hero #2
// ...
