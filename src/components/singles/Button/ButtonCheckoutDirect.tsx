// Component: ButtonCheckoutDirect
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config (node)
import { configShop } from '@/data/config';

// Scripts (node)
import Stripe from 'stripe';

// Scripts (local)
import { classNames } from '@/lib/utils';
import { useAppSelector } from '@/redux';
import { createCheckout } from '@/stripe/lib/utils';

// Components (node)
// ...

// Components (local)
import Button from '@/components/singles/Button/Button';

/*---------- Static Data ----------*/

// Name
const name = 'ButtonCheckoutDirect';

/*---------- Component ----------*/

// Typings
type ButtonCheckoutDirectProps = {
	price?: Stripe.Price;
	theme?: ThemeButton;
	themeSection?: ThemeSection;
	className?: string;
	onClick?: () => void;
};

// Default component
export default function ButtonCheckoutDirect({
	price,
	theme = 'block',
	themeSection = 'default',
	className,
	onClick = () => {},
}: ButtonCheckoutDirectProps) {
	/*----- Store -----*/

	// Redux state - cartCurrency
	const cartCurrency = useAppSelector((state) => state.shop.cartCurrency);

	/*----- Functions -----*/

	// Function - handleClick
	const handleClick = async () => {
		if (price) {
			// Get isDev
			const isDev = process.env.NODE_ENV === 'development';

			// Get url
			let url = isDev
				? `http://localhost:3333/`
				: `https://www.flowersonthefloor.co.uk/`;

			// Declare checkoutSession
			const checkoutSession = {
				// General
				mode: price.type === 'one_time' ? 'payment' : 'subscription',
				automatic_tax: {
					enabled: true,
				},
				success_url: `${url}/product/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${url}/?session_id={CHECKOUT_SESSION_ID}`,

				// Prices
				line_items: [
					{
						price: price.id,
						quantity: 1,
					},
				],

				// Shipping
				shipping_address_collection: {
					allowed_countries: configShop.allowedCountries,
				},
				...(price.type === 'one_time'
					? {
							shipping_options: [
								{
									shipping_rate: 'shr_1OBkMBIwYxs8d3tiJRgQXXUV',
								},
							],
					  }
					: {}),

				// Promotional Codes
				allow_promotion_codes: true,
			};

			// Fetch Checkout
			const checkout = await createCheckout(checkoutSession);

			// If success...
			if (checkout.type === 'success') {
				console.log('Fetched session', checkout);
				if (checkout.session?.url) {
					window.location.assign(checkout.session.url);
				}
			} else {
				console.log('Error fetching session', checkout.error);
			}
		}
	};

	/*----- Init -----*/

	// Return default
	return (
		<Button
			className={classNames(className)}
			component="button-text"
			text={configShop.recurringCta}
			theme={theme}
			themeSection={themeSection}
			onClick={handleClick}
		/>
	);
}
