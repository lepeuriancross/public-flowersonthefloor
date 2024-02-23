// Component: Button
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'Button';

/*---------- Component ----------*/

// Typings
type ButtonProps = {
	isActive?: boolean;
	component?: 'button-text' | 'button-icon';
	type?: 'button' | 'submit' | 'reset';
	ariaDescribedby?: string;
	text?: string;
	icon?: React.ReactNode;
	iconSuffix?: boolean;
	theme?: ThemeButton;
	themeSection?: ThemeSection;
	className?: string;
	onMouseOver?: () => void;
	onMouseOut?: () => void;
	onClick?: () => void;
};

// Default component
export default function Button({
	isActive = false,
	component = 'button-text',
	type = 'button',
	ariaDescribedby,
	text,
	icon,
	iconSuffix,
	theme = 'default',
	themeSection = 'default',
	className,
	onMouseOver = () => {},
	onMouseOut = () => {},
	onClick = () => {},
}: ButtonProps) {
	/*----- Functions -----*/

	// Function - handleMouseOver
	const handleMouseOver = () => {
		// Callback
		onMouseOver();
	};

	// Function - handleMouseOut
	const handleMouseOut = () => {
		// Callback
		onMouseOut();
	};

	// Function - handleClick
	const handleClick = () => {
		// Callback
		onClick();
	};

	/*----- Internal Components -----*/

	// ButtonBackground
	const ButtonBackground = () => {
		return (
			<span
				className={classNames(
					`button__bg absolute z-10 top-0 left-0 w-full h-full border-[2px] rounded-full transition-colors duration-300 ease-out`,
					theme === 'block' &&
						(themeSection === 'primary'
							? 'bg-secondary border-secondary'
							: themeSection === 'secondary'
							? 'bg-primary border-primary lg:hover:bg-primary-dark lg:hover:border-primary-dark'
							: themeSection === 'black'
							? 'bg-secondary border-secondary'
							: 'bg-primary border-primary lg:hover:bg-primary-dark lg:hover:border-primary-dark'),
					theme === 'outline' &&
						(themeSection === 'primary'
							? 'border-white'
							: themeSection === 'secondary'
							? 'border-white'
							: themeSection === 'black'
							? 'border-white'
							: 'border-black')
				)}
			/>
		);
	};

	// ButtonIcon
	const ButtonIcon = () => {
		return (
			<button
				className={classNames(
					`button relative lg:transform lg:transition-transform lg:duration-300 lg:ease-out lg:hover:scale-110`,
					theme === 'block' &&
						(themeSection === 'primary'
							? 'text-primary-dark'
							: themeSection === 'secondary'
							? 'text-white'
							: themeSection === 'black'
							? 'text-white'
							: 'text-white'),
					theme === 'outline' &&
						(themeSection === 'primary'
							? 'text-white'
							: themeSection === 'secondary'
							? 'text-white'
							: themeSection === 'black'
							? 'text-white'
							: 'text-black'),
					className
				)}
				type="button"
				aria-describedby={ariaDescribedby}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				onClick={handleClick}
			>
				{theme !== 'default' && <ButtonBackground />}
				<div
					className={classNames(
						`button__container relative z-20 pointer-events-none`,
						theme !== 'default' && 'h-[50px] w-[50px]'
					)}
				>
					{text && <span className="button__text sr-only">{text}</span>}
					{icon && (
						<span
							className={classNames(
								`button__icon inline-flex justify-center items-center`,
								theme !== 'default' &&
									'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
							)}
						>
							{icon}
						</span>
					)}
				</div>
			</button>
		);
	};

	// ButtonText
	const ButtonText = () => {
		return (
			<button
				className={classNames(
					`button relative outline-none lg:transform lg:transition-transform lg:duration-300 lg:ease-out lg:hover:scale-110`,
					theme === 'block' &&
						(themeSection === 'primary'
							? 'text-primary-dark'
							: themeSection === 'secondary'
							? 'text-white'
							: themeSection === 'black'
							? 'text-white'
							: 'text-white'),
					theme === 'outline' &&
						(themeSection === 'primary'
							? 'text-white'
							: themeSection === 'secondary'
							? 'text-white'
							: themeSection === 'black'
							? 'text-white'
							: 'text-black'),
					className
				)}
				type="button"
				aria-describedby={ariaDescribedby}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				onClick={handleClick}
			>
				{theme !== 'default' && <ButtonBackground />}
				<div
					className={classNames(
						`button__container relative z-20 inline-flex justify-center items-center space-x-4 pointer-events-none`,
						theme !== 'default' && 'h-[50px] px-6'
					)}
				>
					{icon && <span className="button__icon-prefix">{icon}</span>}
					{text && (
						<span className="button__text font-button inline-block tracking-wider">
							{text}
						</span>
					)}
					{iconSuffix && (
						<span className="button__icon-suffix sr-only">{iconSuffix}</span>
					)}
				</div>
			</button>
		);
	};

	/*----- Init -----*/

	// Switch - component
	switch (component) {
		case 'button-icon':
			return <ButtonIcon />;

		default:
			return <ButtonText />;
	}
}
