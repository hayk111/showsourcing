import { uuid } from '~utils';
import { Venue } from '~models/venue.model';
import { AppImage } from '~models/app-image.model';

export class EventDescription {
	id: string;
	name: string;
	website?: string;
	startDate?: string;
	endDate?: string;
	countryCode?: string;
	global: boolean;
	logoImage?: AppImage;
	supplierCount: number;
	primaryColor?: string;
	secondaryColor?: string;
	venue?: Venue;

	constructor(config: EventDescriptionConfig) {
		this.id = uuid();
		Object.assign(this, config);
	}
}

export interface EventDescriptionConfig {
	id?: string;
	name?: string;
	website?: string;
	startDate?: string;
	endDate?: string;
	countryCode?: string;
	global?: boolean;
	supplierCount?: number;
	primaryColor?: string;
	secondaryColor?: string;
	venue?: Venue;
	logoImage?: AppImage;
}