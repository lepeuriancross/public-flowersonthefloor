// Component: SectionProductSuccess
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Config (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';
import { retrieveCheckout } from '@/stripe/lib/utils';

// Components (node)
import Link from 'next/link';

// Components (local)
import Section404 from '@/components/section/Section404';
import TextWrapper from '@/components/singles/Text/TextWrapper';
import TextTitle from '@/components/singles/Text/TextTitle';
import TextSubtitle from '@/components/singles/Text/TextSubtitle';
import TextSpanEmail from '@/components/singles/Text/TextSpanEmail';
import ButtonWrapper from '@/components/singles/Button/ButtonWrapper';
import Button from '@/components/singles/Button/Button';
import SectionWrapper from './_partials/SectionWrapper';

/*---------- Static Data ----------*/

// Name
const name = 'SectionProductSuccess';

/*---------- Component ----------*/

// Typings
type SectionProductSuccessProps = {
	idx?: number;
	sessionId?: string;
	className?: string;
};

// Default component
export default function SectionProductSuccess({
	idx = 0,
	sessionId,
	className,
}: SectionProductSuccessProps) {
	/*----- Init -----*/

	return (
		<SectionProductSuccess1
			idx={idx}
			sessionId={sessionId}
			className={className}
		/>
	);
}

// Section Product Success #1
export async function SectionProductSuccess1({
	idx = 0,
	sessionId = '',
	className,
}: SectionProductSuccessProps) {
	/*----- Init -----*/

	// If no sessionId...
	if (!sessionId) {
		// Return 404
		return (
			<Section404
				title="404: Session ID not found"
				body="It looks like the session you are trying to access does not exist. Please check the url and try again."
			/>
		);
	}

	// Get checkout session
	let checkout = await retrieveCheckout(sessionId);
	console.log('Checkout', checkout);

	// If no session data...
	if (checkout.type === 'error' || !checkout.session) {
		// Return 404
		return (
			<Section404
				title="404: Session data not found"
				body="It looks like the session you are trying to access does not exist. Please check the url and try again."
			/>
		);
	}

	// If deleted customer...
	if (checkout.customer && checkout.customer?.deleted) {
		// Return 404
		return (
			<Section404
				title="404: Customer data not found"
				body="It looks like the customer data you are trying to access does not exist. Please check the url and try again."
			/>
		);
	}

	// Return default
	return (
		<>
			<SectionWrapper
				idx={idx}
				className={classNames(`section w-full min-h-screen`, className)}
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
								text={`Thanks for your order${
									checkout.session.customer_details?.name
										? ', ' + checkout.session.customer_details?.name
										: ''
								}!`}
								themeSection={'primary'}
							/>
							<TextTitle
								Tag={'h3'}
								text={`What happens next?`}
								themeSection={'primary'}
							/>
							<div className="section__body text-body text-base space-y-4">
								<p>
									We have send you an email with your an invoice and we are
									processing your delivery.
								</p>
								<p>
									If you have any questions about your order, please email us at{' '}
									<TextSpanEmail />
								</p>
							</div>
							<div className="section__session-id inline-block mx-auto rounded-lg border border-dashed px-6 py-4">
								<p className="text-xs">
									<b className="uppercase">Order ID:</b> {checkout.session.id}
								</p>
							</div>
							<ButtonWrapper>
								<Link href="/">
									<Button
										text="Continue shopping"
										theme="block"
										themeSection="primary"
									/>
								</Link>
							</ButtonWrapper>
						</TextWrapper>
					</div>
				</div>
			</SectionWrapper>
		</>
	);
}
