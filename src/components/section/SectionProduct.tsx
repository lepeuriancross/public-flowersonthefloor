// Component: SectionProduct
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config (node)
import { useState, useEffect } from 'react';
import Stripe from 'stripe';

// Scripts (local)
import { classNames, numPad } from '@/lib/utils';
import { useAppSelector } from '@/redux';
import { fetchProduct, filterPrices } from '@/stripe/lib/utils';

// Components (node)
import Link from 'next/link';
import { Disclosure, Tab } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

// Components (local)
import TextWrapper from '@/components/singles/Text/TextWrapper';
import TextTitle from '@/components/singles/Text/TextTitle';
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import TextBody from '@/components/singles/Text/TextBody';
import TextPrice from '@/components/singles/Text/TextPrice';
import Countdown from '@/components/singles/Countdown/Countdown';
import ButtonAddToCartWrapper from '@/components/singles/Button/ButtonAddToCartWrapper';
import PatternImage from '@/components/singles/Pattern/PatternImage';
import AosWrapper from '@/components/utility/Aos/AosWrapper';
import ImageBuilder from '@/components/utility/Image/ImageBuilder';
import SectionWrapper from './_partials/SectionWrapper';
import Button from '../singles/Button/Button';

/*---------- Static Data ----------*/

// Name
const name = 'SectionProduct';

/*---------- Component ----------*/

// Typings
type SectionProductProps = {
	idx?: number;
	settings?: BlockProduct;
	product?: Stripe.Product;
	prices?: Stripe.Price[];
	className?: string;
};

// Default component
export default function SectionProduct({
	idx = 0,
	settings,
	className,
}: SectionProductProps) {
	/*----- Store -----*/

	// State - product
	const [product, setProduct] = useState<Stripe.Product>();

	// State - prices
	const [prices, setPrices] = useState<Stripe.Price[]>();

	// Redux state - cartCurrency
	const cartCurrency = useAppSelector((state) => state.shop.cartCurrency);

	/*----- Lifecycle -----*/

	// Watch - settings, cartCurrency
	useEffect(() => {
		// If productId...
		if (settings?.reference?.productId) {
			// Fetch product
			fetchProduct(settings.reference.productId).then((result) => {
				// If product...
				if (result?.product) {
					// Set product
					setProduct(result.product);
				}

				// If prices...
				if (result?.prices && result.prices.length > 0) {
					// Filter prices
					const filteredPrices = filterPrices(
						result.prices,
						'one_time',
						cartCurrency
					);

					// Set prices
					setPrices(filteredPrices);
				}
			});
		}
	}, [settings, cartCurrency]);

	/*----- Init -----*/

	// Switch - component
	switch (settings?.component ?? 'default') {
		// case 'section-product-3':
		// 	return <SectionProduct3 idx={idx} settings={settings} product={product} prices={prices} className={className} />;

		case 'section-product-2':
			return (
				<SectionProduct2
					idx={idx}
					settings={settings}
					product={product}
					prices={prices}
					className={className}
				/>
			);

		case 'section-product-1':
		default:
			return (
				<SectionProduct1
					idx={idx}
					settings={settings}
					product={product}
					prices={prices}
					className={className}
				/>
			);
	}
}

// Section Body #1
export function SectionProduct1({
	idx = 0,
	settings,
	product,
	prices,
	className,
}: SectionProductProps) {
	/*----- Store -----*/

	// State - currentStatus
	const [currentStatus, setCurrentStatus] = useState<
		'idle' | 'countdown' | 'published' | 'expired'
	>('idle');

	/*----- Lifecycle -----*/

	// Watch - publishedAt, expiresAt, currentStatus
	useEffect(() => {
		// Function - tick
		const tick = () => {
			if (settings?.reference?.publishedAt && settings?.reference?.expiresAt) {
				// Get publishedAt, expiresAt
				const { publishedAt, expiresAt } = settings.reference;

				// Get time until publishedAt
				const timeUntilPublished =
					new Date(publishedAt as string).getTime() - new Date().getTime();

				// Get time until expiresAt
				const timeUntilExpired =
					new Date(expiresAt as string).getTime() - new Date().getTime();

				// If timeUntilPublished is positive...
				if (timeUntilPublished > 0) {
					// Set currentStatus
					currentStatus !== 'countdown' && setCurrentStatus('countdown');
				}

				// If timeUntilExpired is positive, but timeUntilPublished is negative...
				else if (timeUntilExpired > 0 && timeUntilPublished < 0) {
					// Set currentStatus
					currentStatus !== 'published' && setCurrentStatus('published');
				}

				// If timeUntilExpired is negative...
				else if (timeUntilExpired < 0) {
					// Set currentStatus
					currentStatus !== 'expired' && setCurrentStatus('expired');

					// Clear interval
					clearInterval(interval);
				}
			}
		};

		// Set interval
		const interval = setInterval(tick, 1000);

		// Init
		tick();

		// Return cleanup
		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [settings, currentStatus]);

	/*----- Init -----*/

	// Return default
	return (
		<>
			{settings?.reference && (
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
						<div
							className={classNames(
								`section__col flex flex-col justify-start`,
								settings?.isFlipped && 'lg:col-start-2'
							)}
						>
							<Tab.Group
								as="div"
								className="section__gallery flex flex-col-reverse"
							>
								<div className="section__gallery-selector mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none lg:mt-8">
									<Tab.List className="section__gallery-list flex justify-center gap-6 lg:justify-start lg:gap-8">
										{settings?.reference?.images.map((image, i) => (
											<Tab
												className="section__gallery-tab relative flex w-full max-w-[120px] cursor-pointer items-center justify-center rounded-md text-sm font-medium uppercase"
												key={`section-product-image-tab-${
													typeof image !== 'string' && image._type === 'image'
														? image._id ?? i
														: i
												}`}
											>
												{({ selected }) => (
													<>
														<span className="section__spacer relative z-10 inline-block w-full pt-[100%]"></span>
														<span className="section__gallery-tab-title sr-only">
															{typeof image !== 'string' &&
															image._type === 'image'
																? image.alt ?? ''
																: ''}
														</span>
														<span className="section__gallery-image absolute z-20 top-0 left-0 inset-0 overflow-hidden rounded-md">
															<ImageBuilder
																className="section__gallery-img h-full w-full object-cover object-center"
																image={image}
																alt={
																	typeof image !== 'string' &&
																	image._type === 'image'
																		? image.alt ?? ''
																		: ''
																}
															/>
														</span>
														<span
															className={classNames(
																'pointer-events-none absolute inset-0 rounded-md ring-[2px]',
																selected
																	? settings?.theme === 'primary'
																		? 'ring-white'
																		: settings?.theme === 'secondary'
																		? 'ring-primary'
																		: settings?.theme === 'black'
																		? 'ring-secondary'
																		: 'ring-primary'
																	: 'ring-transparent'
															)}
															aria-hidden="true"
														/>
													</>
												)}
											</Tab>
										))}
									</Tab.List>
								</div>

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
										<Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
											{settings.reference.images?.map((image, i) => (
												<Tab.Panel
													key={`section-product-image-panel-${
														typeof image !== 'string' && image._type === 'image'
															? image._id ?? i
															: i
													}`}
												>
													<ImageBuilder
														image={image}
														alt={
															typeof image !== 'string' &&
															image._type === 'image'
																? image.alt ?? ''
																: ''
														}
														className="h-full w-full object-cover object-center sm:rounded-lg"
													/>
												</Tab.Panel>
											))}
										</Tab.Panels>
									</AosWrapper>
								</div>
							</Tab.Group>
						</div>

						<div
							className={classNames(
								`section__col flex flex-col justify-center space-y-12 lg:text-left`,
								settings?.isFlipped && 'lg:col-start-1'
							)}
						>
							{/* Product Info */}
							{(settings.reference.title ||
								settings.reference.subtitle ||
								settings.reference.price ||
								settings.reference.body) && (
								<TextWrapper>
									{/* Title */}
									{settings.reference.title && (
										<TextSubtitle
											Tag={'h2'}
											text={settings.reference.title}
											themeSection={settings?.theme}
										/>
									)}

									{/* Subtitle */}
									{settings.reference.subtitle && (
										<TextTitle
											Tag={'h3'}
											text={settings.reference.subtitle}
											themeSection={settings?.theme}
										/>
									)}

									{/* Countdown */}
									<div
										className={classNames(
											`section__countdown flex flex-col justify-start items-center space-y-3 border rounded-md p-6 font-body font-bold text-sm lg:items-start`,
											settings.theme === 'primary'
												? 'bg-primary-dark border-primary-dark'
												: settings.theme === 'secondary'
												? 'bg-primary border-primary'
												: settings.theme === 'black'
												? 'border-black text-current'
												: 'border-current text-current'
										)}
									>
										{/* Idle Message */}
										{currentStatus === 'idle' && (
											<span className="section__countdown-title uppercase animate-pulse">
												Loading...
											</span>
										)}

										{/* Countdown Message */}
										{currentStatus === 'countdown' && (
											<span className="section__countdown-time">
												<span>Live in</span>{' '}
												<span className="opacity-50">:</span>{' '}
												<span>
													<Countdown
														publishedAt={settings.reference.publishedAt}
														expiresAt={settings.reference.expiresAt}
													/>
												</span>
											</span>
										)}

										{/* Published Message */}
										{currentStatus === 'published' && (
											<>
												<TextPrice
													className="lg:pl-[2px]"
													price={settings.reference.price}
													priceSuffix={settings.reference.priceSuffix}
													themeSection={settings?.theme}
												/>
												<span className="section__countdown-time">
													<span>Available for</span>{' '}
													<span className="opacity-50">:</span>{' '}
													<span>
														<Countdown
															publishedAt={settings.reference.publishedAt}
															expiresAt={settings.reference.expiresAt}
														/>
													</span>
												</span>
											</>
										)}

										{/* Expired Message */}
										{currentStatus === 'expired' && (
											<span className="section__countdown-title uppercase">
												Out of stock
											</span>
										)}
									</div>

									{settings.reference.body && (
										<TextBody text={settings.reference.body} />
									)}
								</TextWrapper>
							)}

							{/* Price Buttons */}
							{currentStatus === 'published' &&
								product &&
								prices &&
								prices.length > 0 && (
									<AosWrapper animation="fade-up" delay={0.1}>
										<ButtonAddToCartWrapper
											slug={settings.reference.slug.current}
											product={product}
											prices={prices}
											theme={'block'}
											themeSection={settings?.theme}
										/>
									</AosWrapper>
								)}

							{/* Product Details */}
							{settings.reference.details &&
								settings.reference.details.length > 0 && (
									<AosWrapper animation="fade-up" delay={0.1}>
										<div
											className="section__details"
											aria-labelledby="details-heading"
										>
											<h3
												id="details-heading"
												className="section__details-heading sr-only"
											>
												Additional details
											</h3>

											<div className="section__details-draw divide-y divide-d border-t divide-current">
												{settings.reference.details.map((detail) => (
													<Disclosure as="div" key={detail.title}>
														{({ open }) => (
															<>
																<h4 className="section__details-draw-heading">
																	<Disclosure.Button className="section__details-draw-button group relative flex w-full items-center justify-between py-6 text-left">
																		<span
																			className={classNames(
																				`section__details-draw-title font-subtitle font-semibold tracking-wider uppercase`,
																				settings?.theme === 'primary'
																					? open
																						? 'text-white'
																						: 'text-white'
																					: settings?.theme === 'secondary'
																					? open
																						? 'text-white'
																						: 'text-white'
																					: settings?.theme === 'black'
																					? open
																						? 'text-secondary'
																						: 'text-secondary-dark'
																					: open
																					? 'text-primary'
																					: 'text-primary-dark'
																			)}
																		>
																			{detail.title}
																		</span>
																		<span className="section__details-draw-button ml-6 flex items-center">
																			{open ? (
																				<MinusIcon
																					className={classNames(
																						`section__details-draw-icon block h-6 w-6`,
																						settings?.theme === 'primary'
																							? 'text-white group-hover:text-white'
																							: settings?.theme === 'secondary'
																							? 'text-white group-hover:text-white'
																							: settings?.theme === 'black'
																							? 'text-secondary group-hover:text-secondary-dark'
																							: 'text-primary group-hover:text-primary-dark'
																					)}
																					aria-hidden="true"
																				/>
																			) : (
																				<PlusIcon
																					className={classNames(
																						`section__details-draw-icon block h-6 w-6`,
																						settings?.theme === 'primary'
																							? 'text-white group-hover:text-white'
																							: settings?.theme === 'secondary'
																							? 'text-white group-hover:text-white'
																							: settings?.theme === 'black'
																							? 'text-secondary group-hover:text-secondary-dark'
																							: 'text-primary group-hover:text-primary-dark'
																					)}
																					aria-hidden="true"
																				/>
																			)}
																		</span>
																	</Disclosure.Button>
																</h4>
																<Disclosure.Panel
																	as="div"
																	className="section__details-draw-panel prose prose-sm pb-6 space-y-6 text-current"
																>
																	{detail.items && detail.items.length > 0 && (
																		<ul
																			className="section__details-draw-list"
																			role="list"
																		>
																			{detail.items.map((item) => (
																				<li
																					className="section__details-draw-item font-body"
																					key={item}
																				>
																					{item}
																				</li>
																			))}
																		</ul>
																	)}
																	{detail.body && (
																		<TextBody text={detail.body} />
																	)}
																</Disclosure.Panel>
															</>
														)}
													</Disclosure>
												))}
											</div>
										</div>
									</AosWrapper>
								)}
						</div>
					</div>
				</SectionWrapper>
			)}
		</>
	);
}

// Section Body #2
export function SectionProduct2({
	idx = 0,
	settings,
	product,
	prices,
	className,
}: SectionProductProps) {
	/*----- Store -----*/

	// State - currentStatus
	const [currentStatus, setCurrentStatus] = useState<
		'idle' | 'countdown' | 'published' | 'expired'
	>('idle');

	/*----- Lifecycle -----*/

	// Watch - publishedAt, expiresAt, currentStatus
	useEffect(() => {
		// Function - tick
		const tick = () => {
			if (settings?.reference?.publishedAt && settings?.reference?.expiresAt) {
				// Get publishedAt, expiresAt
				const { publishedAt, expiresAt } = settings.reference;

				// Get time until publishedAt
				const timeUntilPublished =
					new Date(publishedAt as string).getTime() - new Date().getTime();

				// Get time until expiresAt
				const timeUntilExpired =
					new Date(expiresAt as string).getTime() - new Date().getTime();

				// If timeUntilPublished is positive...
				if (timeUntilPublished > 0) {
					// Set currentStatus
					currentStatus !== 'countdown' && setCurrentStatus('countdown');
				}

				// If timeUntilExpired is positive, but timeUntilPublished is negative...
				else if (timeUntilExpired > 0 && timeUntilPublished < 0) {
					// Set currentStatus
					currentStatus !== 'published' && setCurrentStatus('published');
				}

				// If timeUntilExpired is negative...
				else if (timeUntilExpired < 0) {
					// Set currentStatus
					currentStatus !== 'expired' && setCurrentStatus('expired');

					// Clear interval
					clearInterval(interval);
				}
			}
		};

		// Set interval
		const interval = setInterval(tick, 1000);

		// Init
		tick();

		// Return cleanup
		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [settings, currentStatus]);

	/*----- Init -----*/

	// Return default
	return (
		<>
			{settings?.reference && (
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
						<div
							className={classNames(
								`section__col flex flex-col justify-start`,
								settings?.isFlipped && 'lg:col-start-2'
							)}
						>
							<Tab.Group
								as="div"
								className="section__gallery flex flex-col-reverse"
							>
								<div className="section__gallery-selector mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none lg:mt-8">
									<Tab.List className="section__gallery-list flex justify-center gap-6 lg:justify-start lg:gap-8">
										{settings?.reference?.images.map((image, i) => (
											<Tab
												className="section__gallery-tab relative flex w-full max-w-[120px] cursor-pointer items-center justify-center rounded-md text-sm font-medium uppercase"
												key={`section-product-image-tab-${
													typeof image !== 'string' && image._type === 'image'
														? image._id ?? i
														: i
												}`}
											>
												{({ selected }) => (
													<>
														<span className="section__spacer relative z-10 inline-block w-full pt-[100%]"></span>
														<span className="section__gallery-tab-title sr-only">
															{typeof image !== 'string' &&
															image._type === 'image'
																? image.alt ?? ''
																: ''}
														</span>
														<span className="section__gallery-image absolute z-20 top-0 left-0 inset-0 overflow-hidden rounded-md">
															<ImageBuilder
																className="section__gallery-img h-full w-full object-cover object-center"
																image={image}
																alt={
																	typeof image !== 'string' &&
																	image._type === 'image'
																		? image.alt ?? ''
																		: ''
																}
															/>
														</span>
														<span
															className={classNames(
																'pointer-events-none absolute inset-0 rounded-md ring-[2px]',
																selected
																	? settings?.theme === 'primary'
																		? 'ring-white'
																		: settings?.theme === 'secondary'
																		? 'ring-primary'
																		: settings?.theme === 'black'
																		? 'ring-secondary'
																		: 'ring-primary'
																	: 'ring-transparent'
															)}
															aria-hidden="true"
														/>
													</>
												)}
											</Tab>
										))}
									</Tab.List>
								</div>

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
										<Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
											{settings.reference.images?.map((image, i) => (
												<Tab.Panel
													key={`section-product-image-panel-${
														typeof image !== 'string' && image._type === 'image'
															? image._id ?? i
															: i
													}`}
												>
													<ImageBuilder
														image={image}
														alt={
															typeof image !== 'string' &&
															image._type === 'image'
																? image.alt ?? ''
																: ''
														}
														className="h-full w-full object-cover object-center sm:rounded-lg"
													/>
												</Tab.Panel>
											))}
										</Tab.Panels>
									</AosWrapper>
								</div>
							</Tab.Group>
						</div>

						<div
							className={classNames(
								`section__col flex flex-col justify-start space-y-12 lg:text-left`,
								settings?.isFlipped && 'lg:col-start-1'
							)}
						>
							{/* Product Info */}
							{(settings.reference.title ||
								settings.reference.subtitle ||
								settings.reference.price ||
								settings.reference.body) && (
								<TextWrapper>
									{/* Title */}
									{settings.reference.subtitle && (
										<TextSubtitle
											Tag={'h3'}
											text={settings.reference.subtitle}
											themeSection={settings?.theme}
										/>
									)}

									{/* Subtitle */}
									{settings.reference.title && (
										<TextTitle
											Tag={'h2'}
											text={settings.reference.title}
											themeSection={settings?.theme}
										/>
									)}

									{/* Countdown */}
									<div
										className={classNames(
											`section__countdown flex flex-col justify-start items-center space-y-3 border rounded-md p-6 font-body font-bold text-sm lg:items-start`,
											settings.theme === 'primary'
												? 'bg-primary-dark border-primary-dark'
												: settings.theme === 'secondary'
												? 'bg-primary border-primary'
												: settings.theme === 'black'
												? 'border-black text-current'
												: 'border-current text-current'
										)}
									>
										{/* Idle Message */}
										{currentStatus === 'idle' && (
											<span className="section__countdown-title uppercase animate-pulse">
												Loading...
											</span>
										)}

										{/* Countdown Message */}
										{currentStatus === 'countdown' && (
											<span className="section__countdown-time inline-block rounded px-4 py-2 bg-black">
												<span>Live in</span>{' '}
												<span className="opacity-50">:</span>{' '}
												<span>
													<Countdown
														publishedAt={settings.reference.publishedAt}
														expiresAt={settings.reference.expiresAt}
													/>
												</span>
											</span>
										)}

										{/* Published Message */}
										{currentStatus === 'published' && (
											<>
												<TextPrice
													className="lg:pl-[2px]"
													price={settings.reference.price}
													priceSuffix={settings.reference.priceSuffix}
													themeSection={settings?.theme}
												/>
												<span className="section__countdown-time">
													<span>Available for</span>{' '}
													<span className="opacity-50">:</span>{' '}
													<span>
														<Countdown
															publishedAt={settings.reference.publishedAt}
															expiresAt={settings.reference.expiresAt}
														/>
													</span>
												</span>
											</>
										)}

										{/* Expired Message */}
										{currentStatus === 'expired' && (
											<span className="section__countdown-title uppercase">
												Out of stock
											</span>
										)}
									</div>

									{settings.reference.body && (
										<TextBody text={settings.reference.body} />
									)}
								</TextWrapper>
							)}

							{/* Price Buttons */}
							{((currentStatus === 'published' &&
								product &&
								prices &&
								prices.length > 0) ||
								settings?.reference?.slug?.current) && (
								<AosWrapper
									className="flex space-x-4 mx-auto lg:ml-0"
									animation="fade-up"
									delay={0.1}
								>
									{currentStatus === 'published' &&
										product &&
										prices &&
										prices.length > 0 && (
											<ButtonAddToCartWrapper
												slug={settings.reference.slug.current}
												product={product}
												prices={prices}
												theme="block"
												themeSection={settings?.theme}
											/>
										)}
									{settings?.reference?.slug?.current && (
										<Link href={`/product/${settings.reference.slug.current}`}>
											<Button
												text="Learn more"
												theme="outline"
												themeSection={settings?.theme}
											/>
										</Link>
									)}
								</AosWrapper>
							)}
						</div>
					</div>
				</SectionWrapper>
			)}
		</>
	);
}
