import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DEFAULT_IMG, ImageUrls } from '~utils';
import { imageMock } from '~core/ORM/models';

/**
 * Pipes that adds the begining url for images,
 * the pipe accepts either an entity object and will find the first image in object.images.
 * Either a string value
 */
@Pipe({
	name: 'image'
})
export class ImagePipe implements PipeTransform {

	private fileUrl = 'https://files.showsourcing.com';

	constructor(private sanitizer: DomSanitizer) { }

	sizeIndexMap = new Map([
		['xs', 0],
		['s', 1],
		['m', 2],
		['xm', 3],
		['l', 4],
		['xl', 5]
	]);
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
	transform(
		value: any | string,
		size: ('xs' | 's' | 'm' | 'l' | 'xl') = 'xl',
		type: string = 'image' // can be supplier, product etc..
	): string | SafeUrl {

		try {
			// we get the size index from the map
			const sizeIndex = this.sizeIndexMap.get(size);
			// no value
			if (!value)
				return DEFAULT_IMG;

			// array
			if (Array.isArray(value)) {
				return value[0].urls[sizeIndex].url;
			}
			// Object
			if (typeof value === 'object') {

				// AppImage Object
				if (value.urls) {
					return value.urls[sizeIndex].url;
				}

				// PendingImage Object
				if (value.data) {
					return this.sanitizer.bypassSecurityTrustUrl(value.data);
				}

				// Supplier, product, Entity object...
				if (Array.isArray(value.images)) {
					return value.images[0].urls[sizeIndex].url;
				}

				// Preview uploaded image case
				if (value.hasOwnProperty('fileName')) {
					return `${this.fileUrl}/xl/${value.fileName}`; // default size is taken xl, can be changed later
				}

			}
			// if it's a string we return the url made of with that string
			return `${ImageUrls[size]}/${value}`;
		} catch (e) {
			console.error('catched errors on image pipe'); // do we need this?
			return DEFAULT_IMG;
		}
	}

}
