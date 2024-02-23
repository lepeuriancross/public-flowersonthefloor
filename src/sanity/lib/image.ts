// Sanity: Utility Functions
/*----------------------------------------------------------------------------------------------------*/

/*---------- Imports ----------*/

// Scripts (node)
import type { Image } from 'sanity';
import createImageUrlBuilder from '@sanity/image-url';

// Scripts (local)
import { dataset, projectId } from '../env';

/*---------- Functions ----------*/

// Function - imageBuilder
const imageBuilder = createImageUrlBuilder({
	projectId: projectId || '',
	dataset: dataset || '',
});

/*---------- Exports ----------*/

export const urlForImage = (source: Image) => {
	return imageBuilder?.image(source).auto('format').fit('max');
};
