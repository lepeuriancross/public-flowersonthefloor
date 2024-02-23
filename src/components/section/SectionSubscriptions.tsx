// Component: SectionSubscriptions
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
import CardSubscription from '@/components/singles/Card/CardSubscription';
import AosWrapper from '@/components/utility/Aos/AosWrapper';
import SectionWrapper from './_partials/SectionWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'SectionSubscriptions';

/*---------- Component ----------*/

// Typings
type SectionSubscriptionsProps = {
	idx?: number;
	settings?: BlockSubscriptions;
	className?: string;
};

// Default component
export default function SectionSubscriptions({
	idx = 0,
	settings,
	className,
}: SectionSubscriptionsProps) {
	/*----- Init -----*/

	// Switch - component
	switch (settings?.component ?? 'default') {
		// case 'section-subscriptions-2':
		// 	return <SectionSubscriptions2 idx={idx} settings={settings} className={className} />;

		case 'section-subscriptions-1':
		default:
			return (
				<SectionSubscriptions1
					idx={idx}
					settings={settings}
					className={className}
				/>
			);
	}
}

// Section Body #1
export function SectionSubscriptions1({
	idx = 0,
	settings,
	className,
}: SectionSubscriptionsProps) {
	/*----- Init -----*/

	// Declare hasFavorite
	let hasFavorite = false;

	// Check if has favorite
	if (settings?.items && settings.items.length > 0) {
		hasFavorite = settings.items.some((item) => item.isFeatured);
	}

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
					{(settings?.title || settings?.subtitle || settings?.body) && (
						<TextWrapper className="max-w-screen-md mx-auto">
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
								themeSection={settings?.theme ?? 'default'}
							/>
						</AosWrapper>
					)}
				</div>
			</div>

			<div
				className={classNames(
					`section__row relative`,
					hasFavorite ? 'mt-20' : 'mt-10'
				)}
			>
				<div
					className={classNames(
						`section__row-bg absolute top-0 left-0 hidden w-full h-full rounded-lg lg:border-[2px] lg:block`,
						settings?.theme === 'primary'
							? 'bg-primary'
							: settings?.theme === 'secondary'
							? 'bg-secondary'
							: settings?.theme === 'black'
							? 'bg-black-light'
							: 'bg-white-light'
					)}
				/>
				<div
					className={classNames(
						`section__container relative grid grid-flow-dense grid-cols-1 gap-6 lg:gap-0`,
						settings?.columns === '4'
							? 'md:grid-cols-2 lg:grid-cols-4'
							: settings?.columns === '3'
							? 'md:grid-cols-3'
							: 'md:grid-cols-2'
					)}
				>
					{settings?.items?.map((item, i) => (
						<CardSubscription
							key={`section-subscriptions-${item.subscriptionId}`}
							idx={i}
							subscription={item}
							subscriptionId={item.subscriptionId}
							themeSection={settings?.theme}
						/>
					))}
				</div>
			</div>
		</SectionWrapper>
	);
}

// Section Body #2
// ...
