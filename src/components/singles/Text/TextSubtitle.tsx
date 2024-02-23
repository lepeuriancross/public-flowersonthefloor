// Component: TextTitle
/*----------------------------------------------------------------------------------------------------*/

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
const name = 'TextTitle';

/*---------- Component ----------*/

// Typings
type TextTitleProps = {
	Tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
	text?: string;
	themeSection?: ThemeSection;
	className?: string;
};

// Default component
export default function TextTitle({
	Tag = 'h3',
	text,
	themeSection = 'default',
	className,
}: TextTitleProps) {
	// Return default
	return (
		<Tag
			className={classNames(
				'subtitle font-subtitle text-base font-semibold tracking-wider uppercase lg:text-lg',
				themeSection === 'primary'
					? 'text-white'
					: themeSection === 'secondary'
					? 'text-white'
					: themeSection === 'black'
					? 'text-white'
					: 'text-current',
				className
			)}
		>
			{text}
		</Tag>
	);
}
