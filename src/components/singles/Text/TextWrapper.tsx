// Component: TextWrapper
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import { Children } from 'react';

// Scripts (local)
import AosWrapper from '@/components/utility/Aos/AosWrapper';
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'TextWrapper';

/*---------- Component ----------*/

// Typings
type TextWrapperProps = {
	animation?: ThemeAosAnimation;
	duration?: number;
	stagger?: number;
	delay?: number;
	ease?: ThemeAosEase;
	className?: string;
	children?: React.ReactNode;
};

// Default component
export default function TextWrapper({
	animation = 'fade-up',
	duration = 0.6,
	stagger = 0.04,
	delay = 0.1,
	ease = 'easeOut',
	className,
	children,
}: TextWrapperProps) {
	/*----- Init -----*/

	// Return default
	return (
		<div
			className={classNames(`text-wrapper space-y-6`, className)}
			data-name={'TextWrapper'}
		>
			{children &&
				Children.map(children, (child, c) => (
					<AosWrapper
						className="relative block"
						isStateful={false}
						animation={animation}
						duration={duration}
						delay={delay + stagger * c}
						ease={ease}
					>
						{child}
					</AosWrapper>
				))}
		</div>
	);
}
