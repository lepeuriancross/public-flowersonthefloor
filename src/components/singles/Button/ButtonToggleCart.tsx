// Component: ButtonToggleCart
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
import { configShop } from '@/data/config';

// Scripts (node)
import { useDispatch } from 'react-redux';

// Scripts (local)
import { classNames, strCapitalize } from '@/lib/utils';
import { AppDispatch, useAppSelector } from '@/redux';
import { setIsShowingCart } from '@/redux/slices/sliceShop';

// Components (node)
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

// Components (local)
import Button from '@/components/singles/Button/Button';

/*---------- Static Data ----------*/

// Name
const name = 'ButtonToggleCart';

/*---------- Component ----------*/

// Typings
type ButtonToggleCartProps = {
	theme?: ThemeButton;
	themeSection?: ThemeSection;
	className?: string;
};

// Default component
export default function ButtonToggleCart({
	theme = 'default',
	themeSection = 'default',
	className,
}: ButtonToggleCartProps) {
	/*----- Store -----*/

	// Redux state - isScrolled
	const isScrolled = useAppSelector((state) => state.manager.isScrolled);

	// Redux state - isShowingCart
	const isShowingCart = useAppSelector((state) => state.shop.isShowingCart);

	// Redux state - cartItems
	const cartItems = useAppSelector((state) => state.shop.cartItems);

	// Use dispatch
	const dispatch = useDispatch<AppDispatch>();

	/*----- Functions -----*/

	// Function - handleClick
	const handleClick = () => {
		// Toggle isShowingCart
		dispatch(setIsShowingCart(!isShowingCart));
	};

	/*----- Init -----*/

	// Return default
	return (
		<span
			className={classNames(
				`relative inline-block w-[50px] h-[50px]`,
				className
			)}
		>
			<Button
				className="relative z-10"
				component="button-icon"
				type="button"
				icon={
					<ShoppingBagIcon
						className={classNames(
							`w-7`,
							theme !== 'default' && 'transform -translate-y-[2px]'
						)}
					/>
				}
				text={`Toggle ${strCapitalize(configShop.cartName)}`}
				theme={isScrolled > 0 ? 'outline' : theme}
				themeSection={themeSection}
				onClick={handleClick}
			/>
			<span className="counter absolute z-20 bottom-0 right-0 transform translate-x-1/3 inline-block w-5 h-5 rounded-full text-xs shadow-lg pointer-events-none bg-white text-black">
				<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inline-block">
					{cartItems.length}
				</span>
			</span>
		</span>
	);
}
