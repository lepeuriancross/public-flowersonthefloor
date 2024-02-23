// Component: FormContact
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import {
	FormEvent,
	forwardRef,
	useRef,
	useState,
	useContext,
	useImperativeHandle,
} from 'react';
import axios from 'axios';

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
import Button from '@/components/singles/Button/Button';
import { ModalContext } from '@/components/base/TheProviderModal';

/*---------- Static Data ----------*/

// Name
const name = 'FormContact';

// Input validation
const validation = {
	first: {
		required: true,
	},
	last: {
		required: true,
	},
	email: {
		required: true,
	},
	phone: {
		required: false,
	},
	message: {
		required: true,
	},
};

// Formspree
const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

/*---------- Component ----------*/

// Typings
type FormContactProps = {
	themeSection?: ThemeSection;
	className?: string;
};

// Default component
function FormContact(
	{ themeSection = 'default', className }: FormContactProps,
	ref: any
) {
	/*----- Refs -----*/

	// Ref - inputEls
	const inputEls = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>(
		[]
	);

	/*----- Store -----*/

	// State - hasInteracted
	const [hasInteracted, setHasInteracted] = useState(false);

	// State - status
	const [status, setStatus] = useState<{
		submitted?: boolean;
		submitting?: boolean;
		info: { error: boolean; msg: null | string };
	}>({
		submitted: false,
		submitting: false,
		info: { error: false, msg: null },
	});

	// State - inputs
	const [inputs, setInputs] = useState({
		first: '',
		last: '',
		email: '',
		phone: '',
		message: '',
	});

	// State - errors
	const [errors, setErrors] = useState<{
		first: string | boolean;
		last: string | boolean;
		email: string | boolean;
		phone: string | boolean;
		message: string | boolean;
	}>({
		first: false,
		last: false,
		email: false,
		phone: false,
		message: false,
	});

	// Use context
	let { setModalOpen, setModalSettings } = useContext(ModalContext);

	/*----- Functions -----*/

	// Function - submit
	const submit = () => {
		if (!status.submitting && !status.submitted) {
			// If not interacted...
			if (!hasInteracted) {
			}

			// If errors...

			// Set - status
			setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

			// Send axios request
			axios({
				method: 'POST',
				url: formspreeEndpoint,
				data: inputs,
			})
				// If successful...
				.then((response) => {
					console.log('response', response);

					handleServerResponse(
						true,
						'Thank you, your message has been submitted.'
					);
				})

				// If unsuccessful...
				.catch((error) => {
					console.log('error', error);

					handleServerResponse(false, error.response.data.error);
				});
		}
	};

	// Function - handleServerResponse
	const handleServerResponse = (ok: boolean, msg: null | string) => {
		if (ok) {
			setStatus({
				submitted: true,
				submitting: false,
				info: { error: false, msg: msg },
			});
			setInputs({
				first: '',
				last: '',
				email: '',
				phone: '',
				message: '',
			});
			if (setModalSettings) {
				setModalSettings({
					theme: 'success',
					title: 'Message sent',
					body: `Thank you, your message has been submitted. We'll be in touch soon.`,
					cta: 'Continue Shopping',
				});
			}
			if (setModalOpen) {
				setModalOpen(true);
			}
			inputEls.current.forEach((el) => {
				if (el) {
					el.value = '';
				}
			});
		} else {
			setStatus({
				submitted: false,
				submitting: false,
				info: { error: true, msg: msg },
			});
			if (setModalSettings) {
				setModalSettings({
					theme: 'error',
					title: 'Well, this is embarrassing...',
					body: `Something went wrong. Please check your entry and try again.`,
					report: msg ?? undefined,
					cta: 'Continue Shopping',
				});
			}
			if (setModalOpen) {
				setModalOpen(true);
			}
		}
	};

	// Function - validateInputs
	const validateInput = (e: any) => {
		if (
			validation[
				e.target.name as 'first' | 'last' | 'email' | 'phone' | 'message'
			].required &&
			e.target.value === ''
		) {
			setErrors((prev) => ({
				...prev,
				[e.target.name]: 'This field is required.',
			}));
		} else {
			setErrors((prev) => ({
				...prev,
				[e.target.name]: false,
			}));
		}
	};

	// Function - handleOnChange
	const handleOnChange = (e: any) => {
		e.persist();

		// Validate - input
		validateInput(e);

		// Set - hasInteracted
		setHasInteracted(true);

		// Set - inputs
		setInputs((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));

		// Set - status
		setStatus({
			submitted: false,
			submitting: false,
			info: { error: false, msg: null },
		});
	};

	// Function - handleOnSubmit
	const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
		// Prevent default action
		e.preventDefault();

		// Submit
		submit();
	};

	// Exposed custom handles as a ref
	useImperativeHandle(ref, () => ({
		submit: () => {
			// Submit
			submit();
		},
	}));

	/*----- Init -----*/

	// Return default
	return (
		<form
			className={classNames(`form mt-16 text-left lg:mt-0`, className)}
			action="#"
			method="POST"
			onSubmit={handleOnSubmit}
		>
			<div className="form__container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
				<div className="form__col space-y-2.5">
					<label
						className="form__label block font-subtitle text-base font-semibold tracking-wider uppercase leading-6"
						htmlFor="first-name"
					>
						First name
					</label>
					<input
						ref={(el) => {
							inputEls.current[0] = el;
						}}
						className={classNames(
							`form__input block w-full rounded-md border-0 px-3.5 py-3 shadow-sm ring-[2px] ring-inset focus:ring-[2px] focus:ring-inset sm:text-sm sm:leading-6`,
							themeSection === 'primary'
								? 'bg-primary-dark text-white ring-primary-dark placeholder:text-white/50 focus:ring-white'
								: themeSection === 'secondary'
								? 'bg-secondary-dark text-white ring-secondary-dark placeholder:text-white/50 focus:ring-white'
								: themeSection === 'black'
								? 'bg-black text-white ring-black placeholder:text-white/50 focus:ring-white'
								: 'bg-white text-black ring-white placeholder:text-black/50 focus:ring-black'
						)}
						type="text"
						name="first"
						id="first"
						autoComplete="given-name"
						required
						onChange={handleOnChange}
					/>
					{errors.first && (
						<span className="inline-block mt-2 text-xs font-bold uppercase">
							{errors.first}
						</span>
					)}
				</div>

				<div className="form__col space-y-2.5">
					<label
						className="form__label block font-subtitle text-base font-semibold tracking-wider uppercase leading-6"
						htmlFor="last-name"
					>
						Last name
					</label>
					<input
						ref={(el) => {
							inputEls.current[0] = el;
						}}
						className={classNames(
							`form__input block w-full rounded-md border-0 px-3.5 py-3 shadow-sm ring-[2px] ring-inset focus:ring-[2px] focus:ring-inset sm:text-sm sm:leading-6`,
							themeSection === 'primary'
								? 'bg-primary-dark text-white ring-primary-dark placeholder:text-white/50 focus:ring-white'
								: themeSection === 'secondary'
								? 'bg-secondary-dark text-white ring-secondary-dark placeholder:text-white/50 focus:ring-white'
								: themeSection === 'black'
								? 'bg-black text-white ring-black placeholder:text-white/50 focus:ring-white'
								: 'bg-white text-black ring-white placeholder:text-black/50 focus:ring-black'
						)}
						type="text"
						name="last"
						id="last"
						autoComplete="family-name"
						required
						onChange={handleOnChange}
					/>
					{errors.last && (
						<span className="inline-block mt-2 text-xs font-bold uppercase">
							{errors.last}
						</span>
					)}
				</div>

				<div className="form__col space-y-2.5 sm:col-span-2">
					<label
						className="form__input block font-subtitle text-base font-semibold tracking-wider uppercase leading-6"
						htmlFor="email"
					>
						Email
					</label>
					<input
						ref={(el) => {
							inputEls.current[0] = el;
						}}
						className={classNames(
							`form__input block w-full rounded-md border-0 px-3.5 py-3 shadow-sm ring-[2px] ring-inset focus:ring-[2px] focus:ring-inset sm:text-sm sm:leading-6`,
							themeSection === 'primary'
								? 'bg-primary-dark text-white ring-primary-dark placeholder:text-white/50 focus:ring-white'
								: themeSection === 'secondary'
								? 'bg-secondary-dark text-white ring-secondary-dark placeholder:text-white/50 focus:ring-white'
								: themeSection === 'black'
								? 'bg-black text-white ring-black placeholder:text-white/50 focus:ring-white'
								: 'bg-white text-black ring-white placeholder:text-black/50 focus:ring-black'
						)}
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						onChange={handleOnChange}
					/>
					{errors.email && (
						<span className="inline-block mt-2 text-xs font-bold uppercase">
							{errors.email}
						</span>
					)}
				</div>

				<div className="form__col space-y-2.5 sm:col-span-2">
					<div className="form__title flex justify-between text-sm leading-6">
						<label
							className="form__label block font-subtitle text-base font-semibold tracking-wider uppercase"
							htmlFor="phone"
						>
							Phone
						</label>
						<p id="phone-description" className="form__description">
							Optional
						</p>
					</div>
					<input
						ref={(el) => {
							inputEls.current[0] = el;
						}}
						className={classNames(
							`form__input block w-full rounded-md border-0 px-3.5 py-3 shadow-sm ring-[2px] ring-inset focus:ring-[2px] focus:ring-inset sm:text-sm sm:leading-6`,
							themeSection === 'primary'
								? 'bg-primary-dark text-white ring-primary-dark placeholder:text-white/50 focus:ring-white'
								: themeSection === 'secondary'
								? 'bg-secondary-dark text-white ring-secondary-dark placeholder:text-white/50 focus:ring-white'
								: themeSection === 'black'
								? 'bg-black text-white ring-black placeholder:text-white/50 focus:ring-white'
								: 'bg-white text-black ring-white placeholder:text-black/50 focus:ring-black'
						)}
						type="tel"
						name="phone"
						id="phone"
						autoComplete="tel"
						aria-describedby="phone-description"
						onChange={handleOnChange}
					/>
				</div>

				<div className="form__col space-y-2.5 sm:col-span-2">
					<div className="form__title flex justify-between text-sm leading-6">
						<label
							className="form__label block font-subtitle text-base font-semibold tracking-wider uppercase leading-6"
							htmlFor="message"
						>
							How can we help you?
						</label>
						<p id="message-description" className="form__description">
							Max 500 characters
						</p>
					</div>
					<textarea
						ref={(el) => {
							inputEls.current[0] = el;
						}}
						className={classNames(
							`form__input block w-full rounded-md border-0 px-3.5 py-3 shadow-sm ring-[2px] ring-inset focus:ring-[2px] focus:ring-inset sm:text-sm sm:leading-6`,
							themeSection === 'primary'
								? 'bg-primary-dark text-white ring-primary-dark placeholder:text-white/50 focus:ring-white'
								: themeSection === 'secondary'
								? 'bg-secondary-dark text-white ring-secondary-dark placeholder:text-white/50 focus:ring-white'
								: themeSection === 'black'
								? 'bg-black text-white ring-black placeholder:text-white/50 focus:ring-white'
								: 'bg-white text-black ring-white placeholder:text-black/50 focus:ring-black'
						)}
						id="message"
						name="message"
						rows={4}
						aria-describedby="message-description"
						defaultValue={''}
						required
						onChange={handleOnChange}
					/>
					{errors.message && (
						<span className="inline-block mt-2 text-xs font-bold uppercase">
							{errors.message}
						</span>
					)}
				</div>
			</div>
		</form>
	);
}
export default forwardRef(FormContact);
