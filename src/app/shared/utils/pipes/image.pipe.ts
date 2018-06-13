import { Pipe, PipeTransform } from '@angular/core';
import { DEFAULT_IMG } from '~utils';

/**
 * Pipes that adds the begining url for images,
 * the pipe accepts either an entity object and will find the first image in object.images.
 * Either a string value
 */
@Pipe({
	name: 'image'
})
export class ImagePipe implements PipeTransform {
	private static readonly urls = {
		s: 'https://files.showsourcing.com/s',
		m: 'https://files.showsourcing.com/m',
		l: 'https://files.showsourcing.com/l',
		xl: 'https://files.showsourcing.com/xl'
	};

	/**
	 *
	 * @param value : Entity object (like supplier) or string
	 * @param args : 's' | 'm' | 'l' | 'xl' size of the image
	 */
	transform(value: any | string, size: ('s' | 'm' | 'l' | 'xl')): string {
		if (typeof value === 'object') {
			// if it's not an array we return the fileName bcuz it's prolly the file object
			if (!Array.isArray(value.images)) {
				if (value.fileName) {
					return `${ImagePipe.urls[size]}/${value.fileName}`;
				} else {
					return DEFAULT_IMG;
				}
			}
			// if it's an array but there is no image we return the default
			if (!value.images[0] || !value.images[0].fileName) {
				return DEFAULT_IMG;
			}
			// if it's an array we return the first image
			return `${ImagePipe.urls[size]}/${value.images[0].fileName}`;
		} else {
			// if it's a string we return the url made of with that string
			return `${ImagePipe.urls[size]}/${value}`;
		}
	}

}
