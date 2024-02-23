// Stripe: Utility Functions
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { SESSION_ID } from 'sanity';
import Stripe from 'stripe';

/*---------- Functions ----------*/

// Function - Get Stripe Secret Key
export const getStripeSecretKey = (): string => {
	// Get isDev
	const isDev = process.env.NODE_ENV === 'development';

	// Get secretKey
	const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;

	// If the Stripe secret key is not set, throw an error
	if (!secretKey) {
		throw new Error('Stripe secret key not set');
	}

	// Return secretKey
	return secretKey as string;
};

// Function - Fetch Product
export const fetchProduct = async (
	productId: string
): Promise<{
	product?: Stripe.Product;
	prices?: Stripe.Price[];
}> => {
	// Get secretKey
	const secretKey = getStripeSecretKey();

	// Get product
	const product = await new Stripe(secretKey).products.retrieve(productId);

	// Get prices
	const prices = await new Stripe(secretKey).prices.list({
		product: productId,
	});

	// Return product
	return { product, prices: prices.data };
};

// Function - filterPrices
export const filterPrices = (
	prices: Stripe.Price[],
	type: 'one_time' | 'recurring',
	currency: string
): Stripe.Price[] => {
	// Declare filteredPrices
	const filteredPrices: Stripe.Price[] = [];

	// Loop through prices
	for (let i = 0; i < prices.length; i++) {
		// Get price
		const price = prices[i];

		// If the price type and currency match, add it to filteredPrices
		if (
			price.type === type &&
			price.currency.toLowerCase() == currency.toLowerCase()
		) {
			filteredPrices.push(price);
		}
	}

	// Return filteredPrices
	return filteredPrices;
};

// Function - createCheckout
export const createCheckout = async (checkoutSession: {
	[key: string]: any;
}): Promise<{
	type: 'success' | 'error';
	session?: Stripe.Checkout.Session;
	error?: any;
}> => {
	// Get secretKey
	const secretKey = getStripeSecretKey();

	// Get stripe
	const stripe = new Stripe(secretKey);

	// Get session
	try {
		const checkout = await stripe.checkout.sessions.create(checkoutSession);

		// Return session
		return { type: 'success', session: checkout };
	} catch (error: any) {
		// Return session error
		return {
			type: 'error',
			error: error,
		};
	}
};

// Function - retrieveCheckout
export const retrieveCheckout = async (
	sessionId: string
): Promise<{
	type: 'success' | 'error';
	session?: Stripe.Checkout.Session;
	customer?: Stripe.Customer | Stripe.DeletedCustomer;
	error?: any;
}> => {
	// Get secretKey
	const secretKey = getStripeSecretKey();

	// Get stripe
	const stripe = new Stripe(secretKey);

	// Get session
	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		const customer = session.customer
			? await stripe.customers.retrieve(session.customer as string)
			: undefined;

		// Return session
		return { type: 'success', session, customer };
	} catch (error: any) {
		// Return session error
		return {
			type: 'error',
			error: error,
		};
	}
};
