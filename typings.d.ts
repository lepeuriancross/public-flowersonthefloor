// Typings: Global
/*----------------------------------------------------------------------------------------------------*/

/*---------- NextJS Vanilla ----------*/

// NextJS Image
interface NextJsImage {
	_type?: 'nextjs-image';
	src: string;
	height: number;
	width: number;
	blurDataURL: string;
	blurWidth: number;
	blurHeight: number;
}

/*---------- NextJS: UI ----------*/

// Themes
type ThemePage =
	| 'PageIndex'
	| 'PageSingle'
	| 'ProductArchive'
	| 'ProductSingle'
	| 'ProductSuccess'
	| 'ProductError'
	| 'ProjectArchive'
	| 'ProjectSingle'
	| 'PostArchive'
	| 'PostSingle'
	| 'AuthorArchive'
	| 'AuthorSingle'
	| 'CategoryArchive'
	| 'CategorySingle';
type ThemeSection = 'primary' | 'secondary' | 'black' | 'default';
type ThemeButton = 'block' | 'outline' | 'default';
type ThemeCursor = 'Button' | 'default';
type ThemeAosAnimation = 'fade' | 'fade-up' | 'fade-up-left' | 'default';
type ThemeAosEase = 'easeIn' | 'easeOut' | 'easeInOut' | 'linear';

/*---------- Sanity: Vanilla ----------*/

// Reference
interface Reference {
	_type: 'reference';
	_ref: string;
}

// Slug
interface Slug {
	_type: 'slug';
	current: string;
}

// Span
interface Span {
	_type: 'span';
	_key: string;
	marks: string[];
	text: string;
}

// Sanity Image
interface SanityImage extends Base {
	_type: 'image';
	asset?: Reference;
	alt?: string;
	crop: {
		top: number;
		bottom: number;
		left: number;
		right: number;
	};
	hotspot: {
		x: number;
		y: number;
		height: number;
		width: number;
	};
	palette: {
		_type: 'sanity.imagePalette';
		[
			key:
				| 'dominant'
				| 'darkMuted'
				| 'muted'
				| 'lightVibrant'
				| 'darkVibrant'
				| 'lightMuted'
				| 'vibrant'
		]: {
			_type: 'sanity.imagePaletteSwatch';
			background: string;
			foreground: string;
			title: string;
			population: number;
		};
	};
}

/*---------- Sanity Base ----------*/

// Base
interface Base {
	_id?: string;
	_rev?: string;
	_type?: string;
	_createdAt?: Date;
	_updatedAt?: string;
}
interface BlockBase extends Base {
	_key?: string;
	isActive?: boolean;
	paddingTop?: boolean;
	paddingContainer?: boolean;
	paddingBottom?: boolean;
	isCard?: boolean;
	isFlipped?: boolean;
	theme?: ThemeSection;
	className?: string;
}

/*---------- Sanity Objects ----------*/

// Items
interface Review extends Base {
	title: string;
	body: BlockContent[] | string;
}
interface Detail extends Base {
	title: string;
	body: BlockContent[] | string;
	items: string[];
}

// Button
interface ArchiveButton extends Base {
	_type: 'archive';
	title: string;
	type: ThemeDocument;
	theme?: ThemeButton;
}
interface ReferenceButton extends Base {
	_type: 'ref';
	title: string;
	reference: {
		_type: ThemeDocument;
		slug: Slug;
		title?: string;
	};
	theme?: ThemeButton;
}
interface LinkButton extends Base {
	_type: 'link';
	title: string;
	href: string;
	target: '_self' | '_blank';
	theme?: ThemeButton;
}

/*---------- Sanity Blocks ----------*/

// Block Hero
interface BlockHero extends BlockBase {
	_type: 'blockHero';
	component?:
		| 'section-hero-1'
		| 'section-hero-2'
		| 'section-hero-3'
		| 'section-hero-4'
		| 'section-hero-5'
		| 'section-hero-6'
		| 'section-hero-7'
		| 'section-hero-8'
		| 'section-hero-9'
		| 'section-hero-10';
	title?: string;
	subtitle?: string;
	body?: BlockContent[] | string;
	images?: (NextJsImage | SanityImage | string)[];
	buttons?: ListButtons;
}

// Block Body
interface BlockBody extends BlockBase {
	_type: 'blockBody';
	title?: string;
	component?:
		| 'section-body-1'
		| 'section-body-2'
		| 'section-body-3'
		| 'section-body-4'
		| 'section-body-5'
		| 'section-body-6'
		| 'section-body-7'
		| 'section-body-8'
		| 'section-body-9'
		| 'section-body-10';
	subtitle?: string;
	body?: BlockContent[] | string;
	image?: NextJsImage | SanityImage | string;
	buttons?: ListButtons;
}

// Block Reviews
interface BlockReviews extends BlockBase {
	_type: 'blockReviews';
	title?: string;
	component?:
		| 'section-reviews-1'
		| 'section-reviews-2'
		| 'section-reviews-3'
		| 'section-reviews-4'
		| 'section-reviews-5'
		| 'section-reviews-6'
		| 'section-reviews-7'
		| 'section-reviews-8'
		| 'section-reviews-9'
		| 'section-reviews-10';
	reviews?: Review[];
	buttons?: ListButtons;
}

// Block Form Contact
interface BlockContactForm extends BlockBase {
	_type: 'blockContactForm';
	title?: string;
	component?:
		| 'section-contact-form-1'
		| 'section-contact-form-2'
		| 'section-contact-form-3'
		| 'section-contact-form-4'
		| 'section-contact-form-5'
		| 'section-contact-form-6'
		| 'section-contact-form-7'
		| 'section-contact-form-8'
		| 'section-contact-form-9'
		| 'section-contact-form-10';
	subtitle?: string;
	body?: BlockContent[] | string;
	successMsg?: BlockContent[] | string;
	isFlipped?: boolean;
}

// Block Product
interface BlockProduct extends BlockBase {
	_type: 'blockProduct';
	component?:
		| 'section-product-1'
		| 'section-product-2'
		| 'section-product-3'
		| 'section-product-4'
		| 'section-product-5'
		| 'section-product-6'
		| 'section-product-7'
		| 'section-product-8'
		| 'section-product-9'
		| 'section-product-10';
	reference?: Product;
	isFlipped?: boolean;
}

// Block Subscriptions
interface BlockSubscriptions extends BlockBase {
	_type: 'blockSubscriptions';
	title?: string;
	component?:
		| 'section-subscriptions-1'
		| 'section-subscriptions-2'
		| 'section-subscriptions-3'
		| 'section-subscriptions-4'
		| 'section-subscriptions-5'
		| 'section-subscriptions-6'
		| 'section-subscriptions-7'
		| 'section-subscriptions-8'
		| 'section-subscriptions-9'
		| 'section-subscriptions-10';
	columns?: string;
	items?: Subscription[];
	subtitle?: string;
	body?: BlockContent[] | string;
	buttons?: ListButtons;
}

/*---------- Sanity Arrays ----------*/

// Flex Content
type FlexContent = (
	| BlockHero
	| BlockBody
	| BlockReviews
	| BlockContactForm
	| BlockProduct
	| BlockSubscriptions
)[];

// Archvie Content
type ArchiveContent = (Page | Product | Project | Post | Author | Category)[];

// Block Content
interface BlockContent extends Base {
	_type: 'block';
	_key: string;
	children?: Span[];
	markDefs: any[];
	style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
}

// List Buttons
type ListButtons = (ArchiveButton | ReferenceButton | LinkButton)[];

/*---------- Sanity Documents ----------*/

// Themes
type ThemeDocument =
	| 'page'
	| 'product'
	| 'project'
	| 'post'
	| 'author'
	| 'category';

// Page
interface Page extends Base {
	_type: 'page';
	isActive: boolean;
	title: string;
	slug: Slug;
	publishedAt: string;
	description: string;
	images: (NextJsImage | SanityImage | string)[];
	body: BlockContent[] | string;
	categories: Category[];
}

// Product
interface Product extends Base {
	_type: 'product';
	title: string;
	subtitle: string;
	slug: Slug;
	productId: string;
	publishedAt: string;
	expiresAt: string;
	description: string;
	images: (NextJsImage | SanityImage | string)[];
	price: number;
	priceSuffix: string;
	body: BlockContent[] | string;
	details: Detail[];
	categories: Category[];
}

// Subscription
interface Subscription extends Base {
	_type: 'subscription';
	isFeatured;
	title: string;
	subtitle: string;
	slug: Slug;
	subscriptionId: string;
	description: string;
	images: (NextJsImage | SanityImage | string)[];
	price: number;
	priceSuffix: string;
	body: BlockContent[] | string;
	details: Detail[];
	categories: Category[];
}

// Project
interface Project extends Base {
	_type: 'project';
	title: string;
	slug: Slug;
	publishedAt: string;
	description: string;
	images: (NextJsImage | SanityImage | string)[];
	body: BlockContent[] | string;
	categories: Category[];
}

// Post
interface Post extends Base {
	_type: 'post';
	title: string;
	slug: Slug;
	publishedAt: string;
	description: string;
	images: (NextJsImage | SanityImage | string)[];
	body: BlockContent[] | string;
	categories: Category[];
}

// Author
interface Author extends Base {
	_type: 'author';
	title: string;
	slug: Slug;
	description: BlockContent[] | string;
	image: NextJsImage | SanityImage | string;
	body: BlockContent[] | string;
}

// Category
interface Category extends Base {
	_type: 'category';
	title: string;
	slug: Slug;
	description?: BlockContent[] | string;
}

/*---------- Sanity Singletons ----------*/

// Groq Settings
interface Settings extends Base {
	_type: 'settings';
	title: string;
	subtitle: string;
	image: NextJsImage | SanityImage | string;
	description: string;
	author: Author;
	tel: string;
	email: string;
	instagram: string;
	tiktok: string;
	homepage: Page;
	navHeader: ListButtons;
	navFooter: ListButtons;
	comingSoonIsActive: boolean;
	comingSoonTitle: string;
	comingSoonBody: BlockContent[] | string;
}

/*---------- Sanity Groq Result ----------*/

// Sanity Result - Main
interface SanityResult {
	mainSettings?: Settings;
	pageSettings?: Page | Product | Project | Post | Author | Category;
	flexContent?: FlexContent;
	archiveContent?: ArchiveContent;
}
