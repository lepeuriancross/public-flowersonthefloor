// Component: PatternImage
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config (node)
// ...

// Scripts (node)
import { classNames } from '@/lib/utils';

// Scripts (local)
// ...

// Components (node)
// ...

// Components (local)
// ...

// Images
import imgPatternDotWhite from '../../../../public/img/pattern/pattern_dot-white.png';
import imgPatternDotSecondary from '../../../../public/img/pattern/pattern_dot-secondary.png';

/*---------- Static Data ----------*/

// Name
const name = 'PatternImage';

/*---------- Component ----------*/

// Typings
type PatternImageProps = {
	sectionTheme?: ThemeSection;
	className?: string;
};

// Default component
export default function PatternImage({
	sectionTheme = 'default',
	className,
}: PatternImageProps) {
	/*----- Static data -----*/

	const imgPatternDot =
		sectionTheme === 'primary'
			? imgPatternDotWhite
			: sectionTheme === 'secondary'
			? imgPatternDotWhite
			: sectionTheme === 'black'
			? imgPatternDotWhite
			: imgPatternDotSecondary;

	/*----- Init -----*/

	// Return default
	return (
		<span
			className={classNames(`block bg-repeat pointer-events-none`, className)}
			style={{
				backgroundImage: `url(${imgPatternDot.src})`,
			}}
		/>
	);
}
