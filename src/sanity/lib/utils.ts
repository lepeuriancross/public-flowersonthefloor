// Sanity: Utility Functions
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import { groq } from 'next-sanity';

// Scripts (local)
import { getClient } from '@/sanity/lib/client';

/*---------- Sanity Base ----------*/

const groqBase = () => {
	return groq`
        _id,
        _rev,
        _type,
        _createdAt,
        _updatedAt
    `;
};

const groqBlockBase = () => {
	return groq`
        ${groqBase()},
        _key,
        isActive,
        key,
        component,
        paddingTop,
        paddingContainer,
        paddingBottom,
        isCard,
        theme,
        className
    `;
};

/*---------- Sanity Vanilla ----------*/

const groqSlug = () => {
	return groq`
        ${groqBase()},
        current,
    `;
};

const groqImage = () => {
	return groq`
        ${groqBase()},
        asset -> {
            ${groqBase()},
            url,
            metadata {
                palette {
                    ${groqBase()},
                    dominant {
                        ${groqBase()},
                        background,
                        foreground,
                        title,
                        population,
                    },
                    darkMuted {
                        ${groqBase()},
                        background,
                        foreground,
                        title,
                        population,
                    },
                    muted {
                        ${groqBase()},
                        background,
                        foreground,
                        title,
                        population,
                    },
                    lightVibrant {
                        ${groqBase()},
                        background,
                        foreground,
                        title,
                        population,
                    },
                    darkVibrant {
                        ${groqBase()},
                        background,
                        foreground,
                        title,
                        population,
                    },
                    lightMuted {
                        ${groqBase()},
                        background,
                        foreground,
                        title,
                        population,
                    },
                    vibrant {
                        ${groqBase()},
                        background,
                        foreground,
                        title,
                        population,
                    },
                }
            }
        },
        alt,
        crop {
            ${groqBase()},
            top,
            bottom,
            left,
            right,
        },
        hotspot {
            ${groqBase()},
            x,
            y,
            height,
            width,
        },
    `;
};

/*---------- Sanity Objects ----------*/

const groqDetail = () => {
	return groq`
        ${groqBase()},
        title,
        body,
        items[],
    `;
};

const groqArchiveButton = () => {
	return groq`
        ${groqBase()}, 
        ...,
    `;
};

const groqReferenceButton = () => {
	return groq`
        ${groqBase()},
        title,
        theme,
        reference -> {
            _type == 'page' => {
                ${groqBase()},
                slug {
                    ${groqSlug()}
                },
                title,
            },
            _type == 'product' => {
                ${groqBase()},
                slug {
                    ${groqSlug()}
                },
                title,
            },
            _type == 'project' => {
                ${groqBase()},
                slug {
                    ${groqSlug()}
                },
                title,
            },
            _type == 'post' => {
                ${groqBase()},
                slug {
                    ${groqSlug()}
                },
                title,
            },
            _type == 'author' => {
                ${groqBase()},
                slug {
                    ${groqSlug()}
                },
                title,
            },
            _type == 'category' => {
                ${groqBase()},
                slug {
                    ${groqSlug()}
                },
                title,
            },
        }
    `;
};

const groqLinkButton = () => {
	return groq`
        ${groqBase()},
        ...,
    `;
};

/*---------- Sanity Blocks ----------*/

const groqBlockHero = () => {
	return groq`
        ${groqBlockBase()},
        title,
        subtitle,
        body,
        images[] {
            ${groqImage()}
        },
        buttons[] {
            ${groqListButtons()}
        },
        isFlipped
    `;
};

const groqBlockBody = () => {
	return groq`
        ${groqBlockBase()},
        title,
        subtitle,
        body,
        image {
            ${groqImage()}
        },
        buttons[] {
            ${groqListButtons()}
        },
        isFlipped
    `;
};

const groqBlockReviews = () => {
	return groq`
        ${groqBlockBase()},
        title,
        reviews[] {
            title,
            body
        },
        buttons[] {
            ${groqListButtons()}
        },
    `;
};

const groqBlockContactForm = () => {
	return groq`
        ${groqBlockBase()},
        title,
        subtitle,
        body,
        successMsg,
        isFlipped
    `;
};

const groqBlockProduct = () => {
	return groq`
        ${groqBlockBase()},
        reference -> {
            ${groqProduct()}
        },
        isFlipped
    `;
};

const groqBlockSubscriptions = () => {
	return groq`
        ${groqBlockBase()},
        title,
        subtitle,
        body,
        columns,
        items[] -> {
            ${groqSubscription()}
        },
        buttons[] {
            ${groqListButtons()}
        }
    `;
};

/*---------- Sanity Arrays ----------*/

const groqFlexContent = () => {
	return groq`
        ${groqBlockBase()},
        _type == 'blockHero' => {
            ${groqBlockHero()}
        },
        _type == 'blockBody' => {
            ${groqBlockBody()}
        },
        _type == 'blockReviews' => {
            ${groqBlockReviews()}
        },
        _type == 'blockContactForm' => {
            ${groqBlockContactForm()}
        },
        _type == 'blockProduct' => {
            ${groqBlockProduct()}
        },
        _type == 'blockSubscriptions' => {
            ${groqBlockSubscriptions()}
        }
    `;
};

const groqListButtons = () => {
	return groq`
        ${groqBase()},
        _type == 'archive' => {
            ${groqArchiveButton()}
        },
        _type == 'ref' => {
            ${groqReferenceButton()}
        },
        _type == 'link' => {
            ${groqLinkButton()}
        },
    `;
};

/*---------- Sanity Documents ----------*/

const groqPage = () => {
	return groq`
        ${groqBase()},
        isActive,
        title,
        slug {
            ${groqSlug()}
        },
        publishedAt,
        description,
        images[] {
            ${groqImage()}
        },
        author -> {
            title,
            slug {
                ${groqSlug()}
            },
        },
        navHeader[] {
            ${groqListButtons()}
        },
        navFooter[] {
            ${groqListButtons()}
        },
        comingSoonIsActive,
        comingSoonTitle,
        comingSoonBody
    `;
};

const groqProduct = () => {
	return groq`
        ${groqBase()},
        isActive,
        title,
        subtitle,
        slug {
            ${groqSlug()}
        },
        productId,
        publishedAt,
        expiresAt,
        description,
        images[] {
            ${groqImage()}
        },
        price,
        priceSuffix,
        body,
        details[] {
            ${groqDetail()}
        },
        categories[] {
            ${groqCategory()}
        }
    `;
};

const groqSubscription = () => {
	return groq`
        ${groqBase()},
        isActive,
        isFeatured,
        title,
        subtitle,
        slug {
            ${groqSlug()}
        },
        subscriptionId,
        description,
        images[] {
            ${groqImage()}
        },
        price,
        priceSuffix,
        body,
        details[] {
            ${groqDetail()}
        },
        categories[] {
            ${groqCategory()}
        }
    `;
};

const groqCategory = () => {
	return groq`
        ${groqBase()},
        title,
        slug {
            ${groqSlug()}
        },
        description,
    `;
};

/*---------- Sanity Singletons ----------*/

const groqSettings = () => {
	return groq`
        ${groqBase()},
        title,
        subtitle,
        image {
            ${groqImage()}
        },
        description,
        author -> {
            title,
            slug {
                ${groqSlug()}
            }
        },
        tel,
        email,
        instagram,
        tiktok,
        homepage -> {
            title,
            slug {
                ${groqSlug()}
            }
        },
        navHeader[] {
            ${groqListButtons()}
        },
        navFooter[] {
            ${groqListButtons()}
        },
        comingSoonIsActive,
        comingSoonTitle,
        comingSoonBody
    `;
};

/*---------- Sanity Queries ----------*/

// Groq Result - Page
export const groqResultPageIndex = groq`{
    "mainSettings": *[_type == "settings"][0] {
        ${groqSettings()}
    },
    "pageSettings": *[_type == "settings"][0].homepage -> {
        _type == 'page' => {
            ${groqPage()}
        },
    },
    "flexContent": *[_type == "settings"][0].homepage -> flexContent[] {
        ${groqFlexContent()}
    },
    "archiveContent": *[_type == "page" && _id > $lastId] | order(_id) [0...10] {
        ${groqPage()}
    }
}`;
export const groqResultPageSingle = groq`{
    "mainSettings": *[_type == "settings"][0] {
        ${groqSettings()}
    },
    "pageSettings": *[_type == "page" && slug.current == $slug][0] {
        ${groqPage()}
    },
    "flexContent": *[_type == "page" && slug.current == $slug][0].flexContent[] {
        ${groqFlexContent()}
    },
    "archiveContent": *[_type == "page" && _id > $lastId] | order(_id) [0...10] {
        ${groqPage()}
    }
}`;

// Groq Result - Product
export const groqResultProductArchive = groq`{
    "mainSettings": *[_type == "settings"][0] {
        ${groqSettings()}
    },
    "archiveContent": *[_type == "product" && _id > $lastId] | order(_id) [0...10] {
        ${groqProduct()}
    }
}`;
export const groqResultProductSingle = groq`{
    "mainSettings": *[_type == "settings"][0] {
        ${groqSettings()}
    },
    "pageSettings": *[_type == "product" && slug.current == $slug][0] {
        ${groqProduct()}
    },
    "flexContent": *[_type == "product" && slug.current == $slug][0].flexContent[] {
        ${groqFlexContent()}
    },
    "archiveContent": *[_type == "product" && _id > $lastId] | order(_id) [0...10] {
        ${groqProduct()}
    }
}`;
export const groqResultProductSuccess = groq`{
    "mainSettings": *[_type == "settings"][0] {
        ${groqSettings()}
    },
    "archiveContent": *[_type == "product" && _id > $lastId] | order(_id) [0...10] {
        ${groqProduct()}
    }
}`;
export const groqResultProductError = groq`{
    "mainSettings": *[_type == "settings"][0] {
        ${groqSettings()}
    },
    "archiveContent": *[_type == "product" && _id > $lastId] | order(_id) [0...10] {
        ${groqProduct()}
    }
}`;

// Groq Result - Subscription
export const groqResultSubscriptionArchive = groq`{
    "mainSettings": *[_type == "settings"][0] {
        ${groqSettings()}
    },
    "archiveContent": *[_type == "subscription" && _id > $lastId] | order(_id) [0...10] {
        ${groqSubscription()}
    }
}`;
export const groqResultSubscriptionSingle = groq`{
    "mainSettings": *[_type == "settings"][0] {
        ${groqSettings()}
    },
    "pageSettings": *[_type == "subscription" && slug.current == $slug][0] {
        ${groqSubscription()}
    },
    "flexContent": *[_type == "subscription" && slug.current == $slug][0].flexContent[] {
        ${groqFlexContent()}
    },
    "archiveContent": *[_type == "subscription" && _id > $lastId] | order(_id) [0...10] {
        ${groqSubscription()}
    }
}`;

/*---------- Functions ----------*/

// Function - getPage
export async function getPage(
	type:
		| 'PageIndex'
		| 'PageSingle'
		| 'ProductArchive'
		| 'ProductSingle'
		| 'ProductSuccess'
		| 'ProductError'
		| 'SubscriptionArchive'
		| 'SubscriptionSingle',
	params?: {
		slug?: string; // <- used for PageSingle, ProductSingle, SubscriptionSingle
		lastId?: string; // <- used for PageIndex, PageSingle, ProductArchive, ProductSingle, SubscriptionArchive, SubscriptionSingle
		sessionId?: string; // <- used for ProductSuccess and ProductError
	},
	preview?: { token?: string }
) {
	// Declare variables
	let result;

	// Switch - type
	switch (type) {
		case 'PageIndex':
			// Fetch Index
			result = getClient(preview).fetch(groqResultPageIndex, {
				lastId: params?.lastId ?? '',
			}) as SanityResult;

			// Return parsed result
			return result;

		case 'PageSingle':
			// Fetch Single
			result = getClient(preview).fetch(groqResultPageSingle, {
				slug: params?.slug ?? '',
				lastId: params?.lastId ?? '',
			}) as SanityResult;

			// Return parsed result
			return result;

		case 'ProductArchive':
			// Fetch Archive
			result = getClient(preview).fetch(groqResultProductArchive, {
				lastId: params?.lastId ?? '',
			}) as SanityResult;

			// Return parsed result
			return result;

		case 'ProductSingle':
			// Fetch Single
			result = getClient(preview).fetch(groqResultProductSingle, {
				slug: params?.slug ?? '',
				lastId: params?.lastId ?? '',
			}) as SanityResult;

			// Return parsed result
			return result;

		case 'ProductSuccess':
			// Fetch Success
			result = getClient(preview).fetch(groqResultProductSuccess, {
				lastId: params?.lastId ?? '',
			}) as SanityResult;

			// Return parsed result
			return result;

		case 'ProductError':
			// Fetch Success
			result = getClient(preview).fetch(groqResultProductError, {
				lastId: params?.lastId ?? '',
			}) as SanityResult;

			// Return parsed result
			return result;

		case 'SubscriptionArchive':
			// Fetch Archive
			result = getClient(preview).fetch(groqResultSubscriptionArchive, {
				lastId: params?.lastId ?? '',
			}) as SanityResult;

			// Return parsed result
			return result;

		case 'SubscriptionSingle':
			// Fetch Single
			result = getClient(preview).fetch(groqResultSubscriptionSingle, {
				slug: params?.slug ?? '',
				lastId: params?.lastId ?? '',
			}) as SanityResult;

			// Return parsed result
			return result;

		default:
			break;
	}
}

// Function - parseButtons
export function parseButtons(
	buttons: ListButtons,
	pathname = '/',
	pathhome = 'home'
) {
	// Declare parsedButtons
	let parsedButtons: {
		name?: string;
		path?: string;
		target?: '_self' | '_blank';
		theme?: ThemeButton;
	}[] = [];

	// Loop - buttons
	buttons.forEach((button) => {
		// Switch - type
		switch (button._type) {
			case 'archive':
				// Push - parsed button
				parsedButtons.push({
					name: button.title ?? `Find out more`,
					path: `/${button.type ?? ''}`,
					target: '_self',
					theme: button.theme ?? 'default',
				});
				break;

			case 'ref':
				// Push - parsed button
				parsedButtons.push({
					name: button.title ?? `Find out more`,
					path: `/${
						button.reference._type === 'page'
							? ''
							: button.reference._type + '/'
					}${
						button.reference.slug.current == pathhome
							? ''
							: button.reference.slug.current
					}`,
					target: '_self',
					theme: button.theme ?? 'default',
				});
				break;

			case 'link':
				// Push - parsed button
				parsedButtons.push({
					name: button.title ?? `Find out more`,
					path: button.href ?? '',
					target: button.target ?? '_blank',
					theme: button.theme ?? 'default',
				});
				break;

			default:
				break;
		}
	});

	// Return parsed buttons
	return parsedButtons;
}
