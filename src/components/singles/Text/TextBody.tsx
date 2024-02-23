// Component: TextBody
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames, strRemoveTags } from '@/lib/utils';
import { useAppSelector } from '@/redux';

// Components (node)
import { toHTML } from '@portabletext/to-html';
import { PortableText } from '@portabletext/react';

// Components (local)
// ...

/*---------- Static Content ----------*/

// Name
const name = 'TextBody';

/*---------- Template ----------*/

// Typings
type TextBodyProps = {
	text?: BlockContent[] | string;
	toPlainText?: boolean;
	className?: string;
};

// Default component
export default function TextBody({
	text,
	toPlainText = false,
	className,
}: TextBodyProps) {
	/*----- Store -----*/

	// Redux state - settingBiggerText
	const settingBiggerText = useAppSelector(
		(state) => state.accessibility.settingBiggerText
	);

	// Redux state - settingLineHeight
	const settingLineHeight = useAppSelector(
		(state) => state.accessibility.settingLineHeight
	);

	/*----- Init -----*/

	// If toPlainText...
	if (toPlainText) {
		return (
			<>
				{text && typeof text == 'string'
					? text
					: strRemoveTags(toHTML(text as BlockContent[]))}
			</>
		);
	}

	// Return default
	return (
		<div className={classNames(`body`, className ?? '')} data-name={name}>
			<div
				className={classNames(
					`body__container leading-6 space-y-4`,
					settingBiggerText === 1
						? 'text-[1.1em]'
						: settingBiggerText === 2
						? 'text-[1.2em]'
						: settingBiggerText === 3
						? 'text-[1.3em]'
						: 'text-[1em]',
					settingLineHeight === 1
						? 'leading-[1.5em]'
						: settingLineHeight === 2
						? 'leading-[1.7em]'
						: settingLineHeight === 3
						? 'leading-[1.9em]'
						: 'leading-[1.3em]'
				)}
			>
				{text && typeof text == 'string' ? (
					<p>{text}</p>
				) : (
					<PortableText value={text as BlockContent[]} />
				)}
			</div>
		</div>
	);
}
