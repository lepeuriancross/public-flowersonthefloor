// Component: Section404
/*----------*/

/*---------- Imports ----------*/

// Config (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
import TextWrapper from '@/components/singles/Text/TextWrapper';
import TextTitle from '@/components/singles/Text/TextTitle';
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import TextBody from '@/components/singles/Text/TextBody';
import SectionWrapper from './_partials/SectionWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'Section404';

/*---------- Component ----------*/

// Typings
type Section404Props = {
	idx?: number;
	title?: string;
	subtitle?: string;
	body?: string;
	className?: string;
};

// Default component
export default function Section404({
	idx = 0,
	title,
	subtitle,
	body,
	className,
}: Section404Props) {
	/*----- Init -----*/

	// Return default
	return (
		<SectionWrapper
			idx={idx}
			className={classNames(`section min-h-screen`, className)}
			theme="primary"
			paddingTop={true}
			paddingContainer={true}
			paddingBottom={true}
			name={name}
		>
			<div
				className={classNames(
					`section__row grid grid-flow-dense grid-cols-1 gap-6 sm:gap-12 lg:gap-20`
				)}
			>
				<div className="section__col flex flex-col justify-center space-y-12">
					<TextWrapper className="max-w-screen-md mx-auto">
						<TextSubtitle
							Tag={'h2'}
							text={subtitle ?? `Well, this is awkward...`}
							themeSection={'primary'}
						/>
						<TextTitle
							Tag={'h3'}
							text={title ?? `404: Page not found`}
							themeSection={'primary'}
						/>
						{body && <TextBody text={body} />}
					</TextWrapper>
				</div>
			</div>
		</SectionWrapper>
	);
}
