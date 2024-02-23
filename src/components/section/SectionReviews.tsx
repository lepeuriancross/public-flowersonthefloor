// Component: SectionReviews
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import { StarIcon } from '@heroicons/react/20/solid';

// Components (local)
import TextWrapper from '@/components/singles/Text/TextWrapper';
import TextTitle from '@/components/singles/Text/TextTitle';
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import TextBody from '@/components/singles/Text/TextBody';
import CarouselReviews from '@/components/singles/Carousel/CarouselReviews';
import ButtonWrapper from '@/components/singles/Button/ButtonWrapper';
import AosWrapper from '@/components/utility/Aos/AosWrapper';
import ImageBuilder from '@/components/utility/Image/ImageBuilder';
import SectionWrapper from './_partials/SectionWrapper';

// Images
import graphicHornsWhite from '../../../public/img/graphics/graphic_horns-white.svg';
import graphicHornsPrimary from '../../../public/img/graphics/graphic_horns-primary.svg';
import graphicHornsSecondary from '../../../public/img/graphics/graphic_horns-secondary.svg';

/*---------- Static Data ----------*/

// Name
const name = 'SectionReviews';

/*---------- Component ----------*/

// Typings
type SectionReviewsProps = {
	idx?: number;
	settings?: BlockReviews;
	className?: string;
};

// Default component
export default function SectionReviews({
	idx = 0,
	settings,
	className,
}: SectionReviewsProps) {
	/*----- Init -----*/

	// Switch - component
	switch (settings?.component ?? 'default') {
		// case 'section-reviews-2':
		// 	return <SectionReviews2 idx={idx} settings={settings} className={className} />;

		case 'section-reviews-1':
		default:
			return (
				<SectionReviews1 idx={idx} settings={settings} className={className} />
			);
	}
}

// Section Reviews #1
export function SectionReviews1({
	idx = 0,
	settings,
	className,
}: SectionReviewsProps) {
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
					`section__row grid grid-flow-dense grid-cols-1 gap-6 sm:gap-12 lg:gap-20`
				)}
			>
				<div
					className={classNames(
						`section__col flex flex-col justify-center space-y-12`,
						settings?.isFlipped && 'lg:col-start-1'
					)}
				>
					{(settings?.title ||
						(settings?.reviews && settings.reviews.length)) && (
						<TextWrapper>
							<div className="section__graphic mx-auto w-1/6 lg:w-[8%] xl:md:w-[5%]">
								<ImageBuilder
									image={
										settings?.theme === 'primary'
											? graphicHornsSecondary
											: settings?.theme === 'secondary'
											? graphicHornsPrimary
											: settings?.theme === 'black'
											? graphicHornsWhite
											: graphicHornsSecondary
									}
									className="w-full h-full object-contain"
								/>
							</div>
							{settings?.title && (
								<div
									className={classNames(
										`section__title-wrapper flex justify-center items-center`,
										settings?.theme === 'primary'
											? 'text-secondary'
											: settings?.theme === 'secondary'
											? 'text-primary'
											: settings?.theme === 'black'
											? 'text-white'
											: 'text-secondary'
									)}
								>
									<div className="section__title-stars hidden justify-center items-center space-x-1 md:inline-flex">
										<StarIcon className="w-5 h-5" />
										<StarIcon className="w-5 h-5" />
										<StarIcon className="w-5 h-5" />
									</div>
									<TextSubtitle
										Tag="h2"
										className="section__title md:mx-6"
										text={settings.title}
									/>
									<div className="section__title-stars hidden justify-center items-center space-x-1 md:inline-flex">
										<StarIcon className="w-5 h-5" />
										<StarIcon className="w-5 h-5" />
										<StarIcon className="w-5 h-5" />
									</div>
								</div>
							)}
							{settings?.reviews && settings.reviews.length > 0 && (
								<div className="section__carousel">
									<CarouselReviews
										className={classNames(settings?.title && 'pt-4')}
										arrows={true}
										dots={true}
									>
										{settings.reviews.map((review, r) => (
											<div
												key={`section-reviews-carousel-item-${r}`}
												className="section__carousel-item space-y-6"
											>
												{review.title && (
													<TextTitle
														Tag={'h3'}
														text={review.title}
														themeSection={settings?.theme}
													/>
												)}
												{review.body && (
													<TextBody
														className="max-w-screen-md mx-auto"
														text={review.body}
													/>
												)}
											</div>
										))}
									</CarouselReviews>
								</div>
							)}
						</TextWrapper>
					)}

					{settings?.buttons && settings.buttons.length > 0 && (
						<AosWrapper animation="fade-up" delay={0.3}>
							<ButtonWrapper buttons={settings.buttons} />
						</AosWrapper>
					)}
				</div>
			</div>
		</SectionWrapper>
	);
}

// Section Reviews #2
// ...
