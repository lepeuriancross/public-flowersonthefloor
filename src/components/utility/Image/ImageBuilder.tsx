// Component: ImageBuilder
/*----------------------------------------------------------------------------------------------------*/

'use client';

/*---------- Imports ----------*/

// Config
// ...

// Scripts (node)
// ...

// Scripts (local)
import { classNames } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { useNextSanityImage } from 'next-sanity-image';

// Components (node)
import Image from 'next/image';

// Components (local)
// ...

/*---------- Static Data ----------*/

// Name
const name = 'ImageBuilder';

/*---------- Template ----------*/

// Typings
type ImageBuilderProps = {
	image?: NextJsImage | SanityImage | string;
	alt?: string;
	width?: number;
	height?: number;
	priority?: boolean;
	unoptimized?: boolean;
	className?: string;
	style?: React.CSSProperties;
};

// Default component
export default function ImageBuilder({
	image,
	alt = '',
	width = 1920,
	height = 1080,
	priority = false,
	unoptimized = true,
	className,
	style = {},
}: ImageBuilderProps) {
	/*----- Init -----*/

	// If Imported Sanity Image...
	if (image && typeof image === 'object' && image._type) {
		return (
			<SanityImage
				className={classNames(className)}
				style={style}
				image={image as SanityImage}
			/>
		);
	}

	// If Imported NextJs Image...
	if (image && typeof image === 'object' && !image._type) {
		return (
			<Image
				className={classNames(className)}
				style={style}
				src={image}
				alt={alt}
				width={width}
				height={height}
				priority={priority}
				unoptimized={unoptimized ?? null}
			/>
		);
	}

	// If Src url...
	if (image && typeof image === 'string') {
		return (
			<Image
				className={classNames(className)}
				style={style}
				src={image}
				alt={alt}
				width={width}
				height={height}
				priority={priority}
				unoptimized={unoptimized}
			/>
		);
	}

	return null;
}

// SanityImage component
export function SanityImage({
	image,
	alt,
	className,
	style = {},
}: {
	image: SanityImage;
	alt?: string;
	className?: string;
	style?: React.CSSProperties;
}) {
	/*----- Init -----*/

	// Get image props
	const imageProps = useNextSanityImage(client, image);

	// Return default
	return (
		<Image
			{...imageProps}
			className={classNames(`image flex flex-col`, className)}
			style={{
				...style,
				transformOrigin: `${image.hotspot?.x ?? 'center'} ${
					image.hotspot?.y ?? 'center'
				}`,
			}}
			alt={image.alt ?? ''}
			data-name={name}
		/>
	);
}
