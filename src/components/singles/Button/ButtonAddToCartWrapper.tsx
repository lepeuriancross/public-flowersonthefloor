// Component: ButtonAddToCartWrapper
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import Stripe from 'stripe';

// Scripts (local)
import { classNames } from '@/lib/utils';
import ButtonAddToCart from './ButtonAddToCart';
import ButtonCheckoutDirect from './ButtonCheckoutDirect';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'ButtonAddToCartWrapper';

/*---------- Component ----------*/

// Typings
type ButtonAddToCartWrapperProps = {
	slug?: string;
	product?: Stripe.Product;
	prices?: Stripe.Price[];
	theme?: ThemeButton;
	themeSection?: ThemeSection;
};

// Default component
export default function ButtonAddToCartWrapper({
	slug,
	product,
	prices = [],
	theme = 'default',
	themeSection = 'default',
}: ButtonAddToCartWrapperProps) {
	// Return default
	return (
		<div
			className={classNames(
				`button-wrapper inline-flex items-center gap-x-4`,
				classNames
			)}
		>
			{prices?.map((price) => (
				<>
					{price.type === 'one_time' && (
						<ButtonAddToCart
							key={`button-price-wrapper-button-${price.id}`}
							slug={slug}
							product={product}
							price={price}
							theme={theme}
							themeSection={themeSection}
						/>
					)}
					{price.type === 'recurring' && (
						<ButtonCheckoutDirect
							key={`button-price-wrapper-button-${price.id}`}
							price={price}
							theme={theme}
							themeSection={themeSection}
						/>
					)}
				</>
			))}
		</div>
	);
}
