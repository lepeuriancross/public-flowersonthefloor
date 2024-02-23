// Component: TheContent
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
// ...

// Components (local)
import TheManager from '@/components/base/TheManager';
import SectionProduct from '@/components/section/SectionProduct';
import FlexContent from '@/components/section/FlexContent';
import SectionProductSuccess from '../section/SectionProductSuccess';

/*---------- Component ----------*/

// Typings
export type TheContentProps = {
	name: ThemePage;
	params?: {
		slug?: string;
		lastId?: string | null;
		sessionId?: string;
	};
	result?: SanityResult;
	className?: string;
	children?: React.ReactNode;
};

// Default component
export default function TheContent({
	name,
	params,
	result,
	className,
	children,
}: TheContentProps) {
	/*----- Data -----*/

	// Parse data
	const flexContent = (result?.flexContent ?? undefined) as FlexContent;
	const archiveContent = (result?.archiveContent ??
		undefined) as ArchiveContent;
	const lastId =
		archiveContent && archiveContent?.length > 0
			? (archiveContent[archiveContent.length - 1]._id as string)
			: null;

	/*----- Init -----*/

	// Return default
	return (
		<>
			{/* Manager */}
			<TheManager result={result} />

			{/* Children */}
			{children}

			{/* Shop */}
			{name === 'ProductSingle' && (
				<>
					<SectionProduct
						settings={
							{
								_type: 'blockProduct',
								reference: result?.pageSettings as Product,
								paddingTop: true,
								paddingContainer: true,
								paddingBottom: true,
								theme: 'primary',
							} as BlockProduct
						}
						className={classNames(className)}
					/>
				</>
			)}
			{name === 'ProductSuccess' && (
				<SectionProductSuccess sessionId={params?.sessionId ?? undefined} />
			)}

			{/* Archive */}

			{/* Flex Content */}
			{flexContent && flexContent.length > 0 && (
				<FlexContent name={name} flexContent={flexContent} />
			)}
		</>
	);
}
