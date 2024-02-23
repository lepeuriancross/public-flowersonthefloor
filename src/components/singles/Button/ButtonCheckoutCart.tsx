// Component: ButtonCheckoutCart
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
import { configShop } from '@/data/config';

// Scripts (node)
import { useDispatch } from 'react-redux';

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
const name = 'ButtonCheckoutCart';

/*---------- Component ----------*/

// Typings
type ButtonCheckoutCartProps = {
	themeSection?: ThemeSection;
	className?: string;
};

// Default component
export default function ButtonCheckoutCart({
	themeSection = 'default',
	className,
}: ButtonCheckoutCartProps) {
	/*----- Store -----*/

	// Redux state - cartCurrency
	const cartCurrency = useAppSelector((state) => state.shop.cartCurrency);

	// Redux state - cartItems
	const cartItems = useAppSelector((state) => state.shop.cartItems);

	/*----- Functions -----*/

	// Function - handleClick
	const handleClick = async () => {
		// Get isDev
		const isDev = process.env.NODE_ENV === 'development';

		// Get url
		let url = isDev
			? `http://localhost:3333/`
			: `https://www.flowersonthefloor.co.uk/`;

		// Declare lineItems
		let lineItems = [] as {
			price: string;
			quantity: number;
		}[];

		// Loop cartItems
		cartItems.forEach((item) => {
			lineItems.push({
				price: item.price.id,
				quantity: item.qty,
			});
		});

		// Declare checkoutSession
		const checkoutSession = {
			// General
			mode: 'payment',
			automatic_tax: {
				enabled: true,
			},
			success_url: `${url}/product/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${url}/?session_id={CHECKOUT_SESSION_ID}`,

			// Prices
			line_items: lineItems,

			// Shipping
			shipping_address_collection: {
				allowed_countries: configShop.allowedCountries,
			},
			shipping_options: [
				{
					shipping_rate: 'shr_1OBkMBIwYxs8d3tiJRgQXXUV',
				},
			],

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
	};

	/*----- Output -----*/

	// Return default
	return (
		<Button
			className={classNames(className)}
			component="button-text"
			text="Checkout"
			theme="block"
			themeSection={themeSection}
			onClick={handleClick}
		/>
	);
}
