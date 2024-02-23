// Redux: Slice / Cursor
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Stripe from 'stripe';

// Scripts (local)
// ...

/*---------- Config ----------*/

// Typings
type InitialState = {
	// UI
	isShowingCart: boolean;

	// Cart
	cartItems: {
		slug?: string;
		product: Stripe.Product;
		price: Stripe.Price;
		qty: number;
	}[];
	cartCurrency:
		| 'usd'
		| 'cad'
		| 'eur'
		| 'gbp'
		| 'cef'
		| 'aud'
		| 'nzd'
		| 'jpy'
		| 'sgd'
		| 'hkd';
	cartTotal: number;
};

// Initial State
const initialState = {
	// UI
	isShowingCart: false,

	// Cart
	cartItems: [],
	cartCurrency: 'gbp',
	cartTotal: 0,
} as InitialState;

// Create Slice
const content = createSlice({
	name: 'content',
	initialState,
	reducers: {
		// UI
		setIsShowingCart: (state, action: PayloadAction<boolean>) => {
			state.isShowingCart = action.payload;
		},

		// Cart
		addCartItem: (
			state,
			action: PayloadAction<{
				slug?: string;
				product: Stripe.Product;
				price: Stripe.Price;
			}>
		) => {
			// Loop through cart items
			for (let i = 0; i < state.cartItems.length; i++) {
				// Check if product is already in cart
				if (
					state.cartItems[i].product.id === action.payload.product.id &&
					state.cartItems[i].price.id === action.payload.price.id
				) {
					// Increment quantity
					state.cartItems[i].qty++;
					return;
				}
			}

			// Add new item
			state.cartItems.push({
				slug: action.payload.slug,
				product: action.payload.product,
				price: action.payload.price,
				qty: 1,
			});
			return;
		},
		removeCartItem: (state, action: PayloadAction<string>) => {
			// Loop through cart items
			for (let i = 0; i < state.cartItems.length; i++) {
				// Check if product is already in cart
				if (state.cartItems[i].product.id === action.payload) {
					// Decrement quantity
					state.cartItems[i].qty--;

					// If quantity is 0, remove whole item
					if (state.cartItems[i].qty <= 0) {
						state.cartItems = state.cartItems.filter(
							(item) => item.product.id !== action.payload
						);
					}
					return;
				}
			}

			// Remove whole item
			state.cartItems = state.cartItems.filter(
				(item) => item.product.id !== action.payload
			);
			return;
		},
		updateCartTotal: (state) => {
			let total = 0;
			state.cartItems.forEach((item) => {
				total += item.price.unit_amount ?? 0 * item.qty;
			});
			state.cartTotal = total;
		},
	},
});

/*---------- Exports ----------*/

export const {
	// UI
	setIsShowingCart,
	// Cart
	addCartItem,
	removeCartItem,
	updateCartTotal,
} = content.actions;
export default content.reducer;
