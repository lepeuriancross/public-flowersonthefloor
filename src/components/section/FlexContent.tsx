// Component: FlexContent
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
import dynamic from 'next/dynamic';

// Scripts (local)
// ...

// Components (node)
// ...

// Components (local)
import SectionHero from '@/components/section/SectionHero';
const SectionBody = dynamic(() => import('@/components/section/SectionBody'));
const SectionReviews = dynamic(
	() => import('@/components/section/SectionReviews')
);
const SectionContactForm = dynamic(
	() => import('@/components/section/SectionContactForm')
);

const SectionProduct = dynamic(
	() => import('@/components/section/SectionProduct')
);
const SectionSubscriptions = dynamic(
	() => import('@/components/section/SectionSubscriptions')
);

/*---------- Static Data ----------*/

// Name
const name = 'FlexContent';

/*---------- Component ----------*/

// Typings
type FlexContentProps = {
	name: ThemePage;
	flexContent?: FlexContent;
};

// Default component
export default function FlexContent({ name, flexContent }: FlexContentProps) {
	/*----- Init -----*/

	// Return default
	return (
		<>
			{flexContent?.map((block, b) => (
				<>
					{/* General */}
					{block._type === 'blockHero' && (
						<SectionHero
							idx={b}
							key={`flex-content-block-${b}`}
							settings={block}
						/>
					)}
					{block._type === 'blockBody' && (
						<SectionBody
							idx={b}
							key={`flex-content-block-${b}`}
							settings={block}
						/>
					)}
					{block._type === 'blockReviews' && (
						<SectionReviews
							idx={b}
							key={`flex-content-block-${b}`}
							settings={block}
						/>
					)}
					{block._type === 'blockContactForm' && (
						<SectionContactForm
							idx={b}
							key={`flex-content-block-${b}`}
							settings={block}
						/>
					)}

					{/* Shop */}
					{block._type === 'blockProduct' && (
						<SectionProduct
							idx={b}
							key={`flex-content-block-${b}`}
							settings={block}
						/>
					)}
					{block._type === 'blockSubscriptions' && (
						<SectionSubscriptions
							idx={b}
							key={`flex-content-block-${b}`}
							settings={block}
						/>
					)}
				</>
			))}
		</>
	);
}
