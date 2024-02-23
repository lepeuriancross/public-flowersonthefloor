// Component: Price
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
import { configShop } from '@/data/config';

// Scripts (node)
import { useDispatch } from 'react-redux';
import Stripe from 'stripe';

// Scripts (local)
import { classNames, strCapitalize } from '@/lib/utils';
import { AppDispatch, useAppSelector } from '@/redux';
import {
	setIsShowingCart,
	addCartItem,
	updateCartTotal,
} from '@/redux/slices/sliceShop';

// Components (node)
// ...

// Components (local)
import Button from '@/components/singles/Button/Button';

/*---------- Static Data ----------*/

// Name
const name = 'ButtonAddToCart';

/*---------- Component ----------*/

// Typings
type ButtonAddToCartProps = {
	slug?: string;
	product?: Stripe.Product;
	price?: Stripe.Price;
	theme?: ThemeButton;
	themeSection?: ThemeSection;
	className?: string;
	onClick?: () => void;
};

// Default component
export default function ButtonAddToCart({
	slug,
	product,
	price,
	theme = 'default',
	themeSection = 'default',
	className,
	onClick = () => {},
}: ButtonAddToCartProps) {
	/*----- Store -----*/

	// Redux state - cartCurrency
	const cartCurrency = useAppSelector((state) => state.shop.cartCurrency);

	// Use dispatch
	const dispatch = useDispatch<AppDispatch>();

	/*----- Functions -----*/

	// Function - handleClick
	const handleClick = () => {
		if (product && price) {
			// Add cart item
			dispatch(
				addCartItem({
					slug,
					product,
					price,
				})
			);

			// Update cartTotal
			dispatch(updateCartTotal());

			// Show isShowingCart
			dispatch(setIsShowingCart(true));
		}
	};

	/*----- Init -----*/

	// If no product, price...
	if (!product || !price) {
		return null;
	}

	// Return default
	return (
		<Button
			className={classNames(className)}
			component="button-text"
			text={`${configShop.oneTimeCta} ${strCapitalize(configShop.cartName)}`}
			theme={theme}
			themeSection={themeSection}
			onClick={handleClick}
		/>
	);
}
