import { AppImage } from '~models/app-image.model';
import { Booth } from '~models/booth.model';

// show is actually called event on the back-end but since we have two event types (one from team realm)
// and this one from global-constants
export interface Show {
	id: string;
	description: ShowDescription;
	booth: Booth;
	saved: boolean;
}

export interface ShowDescription {
	id: string
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	logoImage: AppImage;
	primaryColor: string;
	secondaryColor: string;
	venue: Venue;
	supplierCount: number;
}

export interface Venue {
	id: string
	name: string;
	country: string;
	addressFull: string;
	city: string;
}