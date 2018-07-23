import { Pipe, PipeTransform } from '@angular/core';
import {
	DEFAULT_EVENT_ICON, DEFAULT_SUPPLIER_ICON, DEFAULT_USER_ICON,
	DEFAULT_IMG, DEFAULT_PROJECT_ICON
} from '~utils/constants';

/** different than image pipe as it will display a logo based on the transformed value
 * which can be any entity type
 */
@Pipe({
	name: 'logo'
})
export class LogoPipe implements PipeTransform {
	private static readonly baseUrl = 'https://files.showsourcing.com/s';

	transform(value: any, type?: string): any {
		// TODO use entity Metadata
		const hasLogo = ['supplier', 'event', 'user', 'project'];
		// the logoImage
		let logoImage;
		// if it's not one of those selectors that have an icon just return nothing
		if (!hasLogo.find(t => t === type))
			return;

		// if the current value has a logoImage then return it
		// if it's an event the image is in the event description and not the event itself...

		if (value) {
			if (value.logoImage)
				logoImage = value.logoImage;
			else if (type === 'event' && value.description && value.description.logoImage)
				logoImage = value.description.logoImage;

			if (logoImage)
				return `${LogoPipe.baseUrl}/${logoImage.fileName}`;
		}
		return this.getDefault(type);
	}

	/** gets the correct icon for selectors inputs */
	getDefault(type: string) {
		// else we give back the default
		switch (type) {
			case 'supplier':
				return DEFAULT_SUPPLIER_ICON;
			case 'user':
				return DEFAULT_USER_ICON;
			case 'event':
				return DEFAULT_EVENT_ICON;
			case 'project':
				return DEFAULT_PROJECT_ICON;
			case 'category':
			case 'supplierType':
				return '';
			default:
				return DEFAULT_IMG;
		}
	}
}
