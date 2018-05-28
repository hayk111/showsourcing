import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipes that adds the begining url for images
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

	transform(value: any, args?: any): any {
		return `${ImagePipe.urls[args[0]]}/${value}`;
	}

}
