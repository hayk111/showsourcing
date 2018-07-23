import { Pipe, PipeTransform } from '@angular/core';
import { DEFAULT_IMG, ImageUrls } from '~utils';

/**
 * Pipes that adds the begining url for images,
 * the pipe accepts either an entity object and will find the first image in object.images.
 * Either a string value
 */
@Pipe({
	name: 'image'
})
export class ImagePipe implements PipeTransform {
	/**
	 * Display image based on an input that can be an object an array or a string
	 *
	 *  Image rules
	 *  0. No value
	 *  - return default image
	 *  1. If array
	 *  - display first one
	 *  2. If object
	 *  - display fileName or images[0].fileName
	 *  3. If string,
	 *  - return url made out of that string
	 *
	 * @param value : Entity object (like supplier), array or string
	 * @param args : 's' | 'm' | 'l' | 'xl' size of the image
	 */
	transform(value: any | string, size: ('s' | 'm' | 'l' | 'xl')): string {
		try {
			// no value
			if (!value)
				return DEFAULT_IMG;

			// array
			if (Array.isArray(value)) {
				return `${ImageUrls[size]}/${value[0].fileName}`;
			}
			// Object
			if (typeof value === 'object') {

				// AppImage Object
				if (value.fileName || value.data) {
					return `${ImageUrls[size]}/${value.fileName}`;
				}

				// PendingImage Object
				if (value.data) {
					return `${ImageUrls[size]}/${value.data}`;
				}

				// Supplier, product, Entity object...
				if (Array.isArray(value.images)) {
					return `${ImageUrls[size]}/${value.images[0].fileName}`;
				}
			}
			// if it's a string we return the url made of with that string
			return `${ImageUrls[size]}/${value}`;
		} catch (e) {
			return DEFAULT_IMG;
		}

	}

}
