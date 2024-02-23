// Component: TheCart
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
import { configShop } from '@/data/config';

// Scripts (node)
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

// Scripts (local)
import { classNames, numDecimalToPrice } from '@/lib/utils';
import { AppDispatch, useAppSelector } from '@/redux';
import { setIsShowingMenu } from '@/redux/slices/sliceManager';
import {
	setIsShowingCart,
	removeCartItem,
	updateCartTotal,
} from '@/redux/slices/sliceShop';

// Components (node)
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Components (local)
import Button from '@/components/singles/Button/Button';
import ButtonCheckoutCart from '@/components/singles/Button/ButtonCheckoutCart';

/*---------- Static Content ----------*/

// Name
const name = 'TheCart';

// Currency symbols
const currencySymbols = {
	usd: '$',
	cad: '$',
	eur: '€',
	gbp: '£',
	cef: '¥',
	aud: '$',
	nzd: '$',
	jpy: '¥',
	sgd: '$',
	hkd: '$',
};

// Typings
type TheCartProps = {
	className?: string;
};

// Default component
export default function TheCart({ className }: TheCartProps) {
	/*----- Store -----*/

	// Redux state - isShowingCart
	const isShowingCart = useAppSelector((state) => state.shop.isShowingCart);

	// Redux state - cartItems
	const cartItems = useAppSelector((state) => state.shop.cartItems);

	// Redux state - cartCurrency
	const cartCurrency = useAppSelector((state) => state.shop.cartCurrency);

	// Redux state - cartTotal
	const cartTotal = useAppSelector((state) => state.shop.cartTotal);

	// Use dispatch
	const dispatch = useDispatch<AppDispatch>();

	/*----- Functions -----*/

	// Function - handleClickToggle
	const handleClickToggle = (value: boolean) => {
		// Hide cart
		dispatch(setIsShowingCart(value));
	};

	// Function - handleClickRemove
	const handleClickRemove = (id: string) => {
		// Remove cart item
		dispatch(removeCartItem(id));

		// Update cartTotal
		dispatch(updateCartTotal());
	};

	/*----- Init -----*/

	// Return default
	return (
		<Transition.Root show={isShowingCart} as={Fragment}>
			<Dialog
				as="div"
				className={classNames(`cart relative`, className)}
				onClose={handleClickToggle}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="cart__bg fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="cart__container fixed inset-0 overflow-hidden">
					<div className="cart__container-inner absolute inset-0 overflow-hidden">
						<div className="cart__row pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="cart__panel pointer-events-auto w-screen max-w-md">
									<div className="cart__panel-container flex h-full flex-col overflow-y-scroll shadow-xl bg-white">
										<div className="cart__panel-container-inner flex-1 overflow-y-auto px-4 py-6 tracking-wider sm:px-6">
											<div className="cart__panel-row flex items-start justify-between">
												<Dialog.Title className="cart__title text-2xl font-button font-medium text-gray-900">
													Shopping {configShop.cartName}
												</Dialog.Title>
												<div className="cart__close ml-3 flex h-7 items-center">
													<button
														className="cart__close-button relative -m-2 p-2 text-gray-400 hover:text-gray-500"
														type="button"
														onClick={() => handleClickToggle(false)}
													>
														<span className="absolute -inset-0.5" />
														<span className="sr-only">
															Close {configShop.cartName}
														</span>
														<XMarkIcon className="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>

											<div className="cart__panel-row mt-8 text-left">
												<div className="flow-root">
													{cartItems.length === 0 ? (
														<h2>
															There are currently no items in your{' '}
															{configShop.cartName}
														</h2>
													) : (
														<ul
															className="cart__list -my-6 divide-y divide-gray-200"
															role="list"
														>
															{cartItems.map((item) => (
																<li
																	key={`the-cart-item-${item.product.id}`}
																	className="cart__item flex py-6"
																>
																	<div className="cart__item-image relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border overflow-hidden border-gray-200">
																		{item.product?.images?.[0] && (
																			<>
																				{item.slug ? (
																					<Link
																						className="absolute top-0 left-0 w-full h-full"
																						href={`/product/${item.slug}`}
																						target="_self"
																					>
																						<Image
																							className="absolute top-0 left-0 w-full h-full inset-0 object-cover object-center"
																							src={item.product.images[0]}
																							alt={item.product.name}
																							layout="fill"
																						/>
																					</Link>
																				) : (
																					<Image
																						className="absolute top-0 left-0 w-full h-full inset-0 object-cover object-center"
																						src={item.product.images[0]}
																						alt={item.product.name}
																						layout="fill"
																					/>
																				)}
																			</>
																		)}
																	</div>
																	<div className="cart__item-info ml-4 flex flex-1 flex-col">
																		<div className="cart__item-info-row">
																			<div className="cart__item-info-col flex justify-between text-base font-medium text-gray-900">
																				{item.product.name && (
																					<h3>
																						{item.slug ? (
																							<Link
																								href={`/product/${item.slug}`}
																								target="_self"
																							>
																								{item.product.name}
																							</Link>
																						) : (
																							<>{item.product.name}</>
																						)}
																					</h3>
																				)}
																				{item.price.unit_amount && (
																					<p className="ml-4">
																						{currencySymbols[cartCurrency]}
																						{numDecimalToPrice(
																							item.price.unit_amount
																						)}
																					</p>
																				)}
																			</div>
																			<div className="cart__item-info-col mt-1 text-sm text-gray-500">
																				<p>Single item delivery</p>
																			</div>
																		</div>
																		<div className="flex flex-1 items-end justify-between text-sm">
																			{item.qty && (
																				<p className="text-gray-500">
																					Qty {item.qty}
																				</p>
																			)}

																			<div className="flex">
																				<button
																					className="font-medium text-primary hover:text-primary-dark"
																					type="button"
																					onClick={() => {
																						handleClickRemove(item.product.id);
																					}}
																				>
																					Remove
																				</button>
																			</div>
																		</div>
																	</div>
																</li>
															))}
														</ul>
													)}
												</div>
											</div>
										</div>

										<div className="border-t border-gray-200 px-4 py-6 space-y-4 sm:px-6">
											<div className="flex justify-between text-base font-medium text-gray-900">
												<p>Subtotal</p>
												<p>
													{currencySymbols[cartCurrency]}
													{numDecimalToPrice(cartTotal)} *
												</p>
											</div>
											<div className="">
												<ButtonCheckoutCart
													className={classNames(
														`w-full transition-opacity diration-300 ease-out`,
														cartItems.length === 0
															? 'opacity-50 pointer-events-none'
															: 'cursor-pointer'
													)}
												/>
											</div>
											<p className="text-sm text-gray-500">
												* Shipping and taxes calculated at checkout.
											</p>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
