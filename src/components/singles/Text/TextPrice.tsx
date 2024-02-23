// Component: TextPrice
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config (node)
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
const name = 'TextPrice';

/*---------- Component ----------*/

// Typings
type TextPriceProps = {
	currency?: string;
	price?: number;
	priceSuffix?: string;
	themeSection?: ThemeSection;
	className?: string;
};

// Default component
export default function TextPrice({
	currency = '£',
	price,
	priceSuffix,
	themeSection = 'default',
	className,
}: TextPriceProps) {
	/*----- Init -----*/

	// Return default
	return (
		<div
			className={classNames(
				'text-price inline-flex justify-start items-end space-x-2 font-subtitle font-semibold tracking-wider uppercase',

				className
			)}
		>
			{currency && (
				<span
					className={classNames(
						`price__currency text-4xl lg:text-5xl`,
						themeSection === 'primary'
							? 'text-secondary'
							: themeSection === 'secondary'
							? 'text-white'
							: themeSection === 'black'
							? 'text-secondary'
							: 'text-primary'
					)}
				>
					{currency}
				</span>
			)}
			{price && (
				<span
					className={classNames(
						`price__value text-4xl lg:text-5xl`,
						themeSection === 'primary'
							? 'text-secondary'
							: themeSection === 'secondary'
							? 'text-white'
							: themeSection === 'black'
							? 'text-secondary'
							: 'text-primary'
					)}
				>
					{price}
				</span>
			)}
			{priceSuffix && (
				<>
					<span className="price-slash pb-[1px]">/</span>
					<span
						className={classNames(
							`price__prefix text-sm pb-[2px]`,
							themeSection === 'primary'
								? 'text-secondary'
								: themeSection === 'secondary'
								? 'text-white'
								: themeSection === 'black'
								? 'text-secondary'
								: 'text-primary'
						)}
					>
						{priceSuffix}
					</span>
				</>
			)}
		</div>
	);
}
