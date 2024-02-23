// Component: TheProviderModal
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { Fragment, createContext, useState } from 'react';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import { Dialog, Transition } from '@headlessui/react';
import {
	CheckIcon,
	ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

// Components (local)
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import TextBody from '@/components/singles/Text/TextBody';
import Button from '@/components/singles/Button/Button';

/*---------- Static Data ----------*/

// Name
const name = 'TheProviderModal';

/*---------- Template ----------*/

// Types
export type TheProviderModalProps = {
	className?: string;
	children?: React.ReactNode;
};
export type TheProviderModalSettings =
	| {
			theme?: 'success' | 'warning' | 'error';
			title?: string;
			body?: BlockContent[] | string;
			report?: BlockContent[] | string;
			cta?: string;
	  }
	| undefined;

// Context
export const ModalContext = createContext(
	{} as {
		modalOpen: boolean;
		setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
		modalSettings?: TheProviderModalSettings;
		setModalSettings?: React.Dispatch<
			React.SetStateAction<TheProviderModalSettings | undefined>
		>;
	}
);

// Default component
export default function TheProviderModal({
	className,
	children,
}: TheProviderModalProps) {
	/*----- Store -----*/

	// State - modalOpen
	const [modalOpen, setModalOpen] = useState(false);

	// State - modalSettings
	const [modalSettings, setModalSettings] = useState<TheProviderModalSettings>({
		theme: 'success',
		title: 'Payment successful',
		body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.',
		cta: 'Close',
	});

	/*----- Init -----*/

	// Render default
	return (
		<ModalContext.Provider
			value={{
				modalOpen,
				modalSettings,
				setModalOpen,
				setModalSettings,
			}}
		>
			<Transition.Root show={modalOpen} as={Fragment}>
				<Dialog
					as="div"
					className={classNames(`modal relative z-10`, className)}
					onClose={setModalOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="modal__bg fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="modal__container fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="modal__container-inner flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="modal__panel relative transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
									<div className="modal__panel-container">
										<div
											className={classNames(
												`modal__panel-row mx-auto flex h-12 w-12 items-center justify-center rounded-full`,
												modalSettings?.theme === 'success' && `bg-secondary`,
												modalSettings?.theme === 'warning' && `bg-yellow`,
												modalSettings?.theme === 'error' && `bg-pink`
											)}
										>
											{modalSettings?.theme === 'success' && (
												<CheckIcon
													className="modal__icon h-7 w-7 text-white"
													aria-hidden="true"
												/>
											)}
											{(modalSettings?.theme === 'warning' ||
												modalSettings?.theme === 'error') && (
												<ExclamationTriangleIcon
													className={classNames(
														`modal__icon h-7 w-7`,
														modalSettings?.theme === 'warning' && `text-black`,
														modalSettings?.theme === 'error' && `text-white`
													)}
													aria-hidden="true"
												/>
											)}
										</div>
										<div className="modal__panel-row mt-3 space-y-4 text-center sm:mt-5">
											{modalSettings?.title && (
												<Dialog.Title
													className="modal__title text-base font-semibold leading-6 text-gray-900"
													as="h3"
												>
													<TextSubtitle text={modalSettings.title} />
												</Dialog.Title>
											)}
											{modalSettings?.body && (
												<div className="modal__body space-y-2 text-sm">
													<TextBody text={modalSettings.body} />
													{modalSettings?.report && (
														<p className="text-xs">
															<TextBody text={`( ${modalSettings.report} )`} />
														</p>
													)}
												</div>
											)}
										</div>
									</div>
									<div className="modal__cta mt-5 text-center sm:mt-6">
										<Button
											text={modalSettings?.cta ?? 'Close'}
											theme="block"
											onClick={() => setModalOpen(false)}
										/>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
			{children}
		</ModalContext.Provider>
	);
}
