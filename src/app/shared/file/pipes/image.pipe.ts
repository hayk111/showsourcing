import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipes that adds the begining url for images,
 * the pipe accepts either an entity object and will find the first image in object.images.
 * Either a string value
 */
@Pipe({
	name: 'image'
})
export class ImagePipe implements PipeTransform {
	private static urls = {
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
	transform(value: any | string, args?: ('s' | 'm' | 'l' | 'xl')[]): any {
		if (typeof value === 'object') {
			if (!Array.isArray(value.images) && value.images[0].fileName) {
				throw new Error(`value.images is not an array...`);
			}
			if (!value.images[0].fileName) {
				throw new Error(`value.images[0].fileName is undefined...`);
			}
			return `${ImagePipe.urls[args[0]]}/${value.images[0].fileName}`;
		} else {
			return `${ImagePipe.urls[args[0]]}/${value}`;
		}
	}

}
