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
	Tag = 'h2',
	text,
	themeSection = 'default',
	className,
}: TextTitleProps) {
	// Return default
	return (
		<Tag
			className={classNames(
				'title font-title text-4xl font-bold tracking-wider uppercase sm:text-6xl',
				themeSection === 'primary'
					? 'text-secondary'
					: themeSection === 'secondary'
					? 'text-primary'
					: themeSection === 'black'
					? 'text-secondary'
					: 'text-primary',
				className
			)}
		>
			{text}
		</Tag>
	);
}
