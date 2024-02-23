// Component: TheMenu
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

// Scripts (local)
import { classNames } from '@/lib/utils';
import { AppDispatch, useAppSelector } from '@/redux';
import { setIsShowingMenu } from '@/redux/slices/sliceManager';

// Components (node)
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Components (local)
import NavHeader from '@/components/singles/Nav/NavHeader';
import NavSocial from '../singles/Nav/NavSocial';

/*---------- Static Data ----------*/

// Name
const name = 'TheMenu';

/*---------- Template ----------*/

// Types
export type TheMenuProps = {
	className?: string;
};

// Default component
export default function TheMenu({ className }: TheMenuProps) {
	/*----- Store -----*/

	// Redux state - isShowingMenu
	const isShowingMenu = useAppSelector((state) => state.manager.isShowingMenu);

	// Use dispatch
	const dispatch = useDispatch<AppDispatch>();

	/*----- Functions -----*/

	// Function - handleClickToggle
	const handleClickToggle = (value: boolean) => {
		// Hide menu
		dispatch(setIsShowingMenu(value));
	};

	/*----- Init -----*/

	// Return default
	return (
		<Transition.Root show={isShowingMenu} as={Fragment}>
			<Dialog
				as="div"
				className={classNames(`relative`, className)}
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
					<div className="menu__bg fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="menu__container fixed inset-0 overflow-hidden">
					<div className="menu__container-inner absolute inset-0 overflow-hidden">
						<div className="menu__row pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="menu__panel pointer-events-auto w-screen max-w-md">
									<div className="menu__panel-container flex h-full flex-col overflow-y-scroll shadow-xl bg-primary text-white">
										<div className="menu__panel-container-inner flex flex-col flex-1 overflow-y-auto px-4 py-6 tracking-wider sm:px-6">
											<div className="menu__panel-row flex items-start justify-between">
												<Dialog.Title className="menu__title text-2xl font-button font-medium">
													Menu
												</Dialog.Title>
												<div className="menu__close ml-3 flex h-7 items-center">
													<button
														className="menu__close-button relative -m-2 p-2"
														type="button"
														onClick={() => handleClickToggle(false)}
													>
														<span className="absolute -inset-0.5" />
														<span className="sr-only">Close Menu</span>
														<XMarkIcon className="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>

											<div className="cart__panel-row flex flex-col justify-center mt-8 space-y-8 text-center grow">
												<NavHeader />
											</div>

											<div className="cart__row mt-8 px-4 py-3 sm:px-6 rounded-full bg-primary-dark">
												<NavSocial />
											</div>
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
