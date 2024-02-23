// Component: CardSubscription
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config (node)
// ...

// Scripts (node)
import { useState, useEffect } from 'react';
import Stripe from 'stripe';

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useAppSelector } from '@/redux';
import { fetchProduct, filterPrices } from '@/stripe/lib/utils';

// Components (node)
import { StarIcon, CheckIcon } from '@heroicons/react/20/solid';

// Components (local)
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import TextBody from '@/components/singles/Text/TextBody';
import ButtonAddToCartWrapper from '@/components/singles/Button/ButtonAddToCartWrapper';
import TextPrice from '../Text/TextPrice';

/*---------- Static Data ----------*/

// Name
const name = 'CardSubscription';

/*---------- Template ----------*/

// Types
export type CardSubscriptionProps = {
	idx?: number;
	subscription?: Subscription;
	subscriptionId?: string;
	themeSection?: ThemeSection;
	className?: string;
};

// Default component
export default function CardSubscription({
	idx = 0,
	subscription,
	subscriptionId,
	themeSection = 'default',
	className,
}: CardSubscriptionProps) {
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
		// If reference...
		if (subscriptionId) {
			// Fetch product
			fetchProduct(subscriptionId).then((result) => {
				// If product...
				if (result?.product) {
					// Filter prices

					// Set product
					setProduct(result.product);
				}

				// If prices...
				if (result?.prices && result.prices.length > 0) {
					// Filter prices
					const filteredPrices = filterPrices(
						result.prices,
						'recurring',
						cartCurrency
					);

					// Set prices
					setPrices(filteredPrices);
				}
			});
		}
	}, [subscriptionId, cartCurrency]);

	/*----- Init -----*/

	// Return default
	return (
		<div
			className={classNames(
				`card relative border-[2px] rounded-lg text-left text-current`,
				subscription?.isFeatured
					? themeSection === 'primary'
						? 'z-20 rounded-lg lg:-my-10 lg:-mr-[1px] lg:shadow-lg bg-primary-dark border-primary-dark'
						: themeSection === 'secondary'
						? 'z-20 rounded-lg lg:-my-10 lg:-mr-[1px] lg:shadow-lg bg-gradient-to-bl from-primary-dark to-primary border-white'
						: themeSection === 'black'
						? 'z-20 rounded-lg lg:-my-10 lg:shadow-lg bg-black border-secondary'
						: 'z-20 rounded-lg lg:-my-10 lg:shadow-lg bg-white border-primary'
					: 'z-10 lg:border-none lg:rounded-none',
				className
			)}
		>
			{idx > 0 && !subscription?.isFeatured && (
				<div className="card__bg absolute z-20 top-0 left-0 hidden h-full border-l-[2px] lg:block" />
			)}
			<div className="card__container relative z-20 flex flex-col justify-between min-h-full">
				<div className="card__row p-6 grow space-y-8 lg:p-8">
					{subscription?.title && (
						<div className="card__title space-y-4">
							<TextSubtitle Tag="h3" text={subscription.title} />
							{subscription?.isFeatured && (
								<span className="card__featured flex justify-center items-center px-4 pt-1 pb-2 border border-dashed rounded-lg space-x-2 font-subtitle text-sm text-center">
									<StarIcon className="w-4 h-4" />
									<span>Our most popular</span>
								</span>
							)}
							{subscription?.price && (
								<TextPrice
									price={subscription.price}
									priceSuffix={subscription.priceSuffix}
									themeSection={
										subscription?.isFeatured
											? themeSection === 'primary'
												? 'secondary'
												: themeSection === 'secondary'
												? 'primary'
												: themeSection === 'black'
												? 'default'
												: 'black'
											: themeSection
									}
								/>
							)}
						</div>
					)}

					{subscription?.description && (
						<div className="card__body text-sm">
							<TextBody text={subscription.description} />
						</div>
					)}
					{subscription?.details && subscription.details.length > 0 && (
						<ul
							className="card__details mt-8 space-y-3 text-base leading-6 sm:mt-10"
							role="list"
						>
							{subscription?.details?.map((detail, d) => (
								<li
									className="card__detail flex justify-start items-start gap-x-3"
									key={`card-subscription-detail-${d}`}
								>
									<CheckIcon
										className={classNames(
											`h-6 w-5 flex-none`,
											themeSection === 'primary'
												? 'text-white'
												: themeSection === 'secondary'
												? 'text-white'
												: themeSection === 'black'
												? 'text-secondary'
												: 'text-primary'
										)}
										aria-hidden="true"
									/>
									{detail.title && (
										<span className="card__detail-title pt-[2px] inline-block">
											<TextBody text={detail.title} />
										</span>
									)}
								</li>
							))}
						</ul>
					)}
				</div>
				<div className="card__row px-6 pb-6 lg:px-8 lg:pb-8">
					{prices && prices.length > 0 && (
						<ButtonAddToCartWrapper
							product={product}
							prices={prices}
							theme={subscription?.isFeatured ? 'block' : 'outline'}
							themeSection={
								subscription?.isFeatured
									? themeSection === 'primary'
										? 'secondary'
										: themeSection === 'secondary'
										? 'primary'
										: themeSection === 'black'
										? 'default'
										: 'black'
									: themeSection
							}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
