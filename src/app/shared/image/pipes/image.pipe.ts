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
	 * @param value : Entity object (like supplier) or string
	 * @param args : 's' | 'm' | 'l' | 'xl' size of the image
	 */
	transform(value: any | string, size: ('s' | 'm' | 'l' | 'xl')): string {
		if (!value)
			return DEFAULT_IMG;

		if (typeof value === 'object') {
			// if it's not an array we return the fileName bcuz it's the image object
			// or data if it's a pending image
			if (!Array.isArray(value.images)) {

				if (value.fileName) {
					return `${ImageUrls[size]}/${value.fileName}`;
				} else if (value.data) {
					return value.data;
				} else {
					return DEFAULT_IMG;
				}
			}
			// if it's an array but there is no image we return the default
			if (!value.images[0] || !value.images[0].fileName) {
				return DEFAULT_IMG;
			}
			// if it's an array we return the first image
			return `${ImageUrls[size]}/${value.images[0].fileName}`;
		} else {
			// if it's a string we return the url made of with that string
			return `${ImageUrls[size]}/${value}`;
		}
	}

}
