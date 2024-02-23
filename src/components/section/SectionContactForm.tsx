// Component: SectionBody
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config (node)
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';

// Components (node)
import { useRef } from 'react';

// Components (local)
import TextWrapper from '@/components/singles/Text/TextWrapper';
import TextTitle from '@/components/singles/Text/TextTitle';
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import TextBody from '@/components/singles/Text/TextBody';
import FormContact from '@/components/singles/Form/FormContact';
import Button from '@/components/singles/Button/Button';
import SectionWrapper from './_partials/SectionWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'SectionBody';

/*---------- Template ----------*/

// Types
export type SectionContactFormProps = {
	idx?: number;
	settings: BlockContactForm;
	className?: string;
};

// Default component
export default function SectionBody({
	idx = 0,
	settings,
	className,
}: SectionContactFormProps) {
	/*----- Init -----*/

	// Switch - component
	switch (settings?.component ?? 'default') {
		// case 'section-contact-form-2':
		// 	return <SectionContactForm2 idx={idx} settings={settings} className={className} />;

		case 'section-contact-form-1':
		default:
			return (
				<SectionContactForm1
					idx={idx}
					settings={settings}
					className={className}
				/>
			);
	}
}

// Default component
export function SectionContactForm1(
	{ idx = 0, settings, className }: SectionContactFormProps,
	ref: any
) {
	/*----- Refs -----*/

	// Ref - form
	const refForm = useRef<HTMLFormElement>(null);

	/*----- Functions -----*/

	// Function - handleClickSubmit
	const handleClickSubmit = () => {
		// Submit
		refForm?.current?.submit();
	};

	/*----- Init -----*/

	return (
		<SectionWrapper
			idx={idx}
			className={classNames(`section`, className)}
			theme={settings?.theme ?? 'default'}
			paddingTop={settings?.paddingTop ?? true}
			paddingContainer={settings?.paddingContainer ?? true}
			paddingBottom={settings?.paddingBottom ?? true}
			name={name}
		>
			<div
				className={classNames(
					`section__row grid grid-flow-dense grid-cols-1 gap-6 sm:gap-12 lg:grid-cols-2 lg:gap-20`
				)}
			>
				<div
					className={classNames(
						`section__col flex flex-col justify-start space-y-12 lg:text-left`,
						settings?.isFlipped && 'lg:col-start-2'
					)}
				>
					{(settings?.title || settings?.subtitle || settings?.body) && (
						<TextWrapper className="grow">
							{settings?.subtitle && (
								<TextSubtitle
									Tag={'h3'}
									text={settings.subtitle}
									themeSection={settings?.theme}
								/>
							)}
							{settings?.title && (
								<TextTitle
									Tag={'h2'}
									text={settings.title}
									themeSection={settings?.theme}
								/>
							)}
							{settings?.body && <TextBody text={settings.body} />}
						</TextWrapper>
					)}
					<div className="mt-10 hidden justify-end lg:justify-start lg:flex">
						<Button
							text={'Send message'}
							type="submit"
							theme="block"
							themeSection={settings?.theme}
							onClick={handleClickSubmit}
						/>
					</div>
				</div>

				<div
					className={classNames(
						`section__col flex flex-col justify-start space-y-12 lg:text-left`,
						settings?.isFlipped && 'lg:col-start-1'
					)}
				>
					<FormContact ref={refForm} themeSection={settings?.theme} />
					<div className="mt-10 flex justify-end lg:justify-start lg:hidden">
						<Button
							text={'Send message'}
							type="submit"
							theme="block"
							themeSection={settings?.theme}
							onClick={handleClickSubmit}
						/>
					</div>
				</div>
			</div>
		</SectionWrapper>
	);
}
