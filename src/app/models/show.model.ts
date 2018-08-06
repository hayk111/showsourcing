import { AppImage } from '~models/app-image.model';

// show is actually called event on the back-end but since we have two event types (one from team realm)
// and this one from global-constants
export interface Show {
	id: string;
	description: ShowDescription;
}

export interface ShowDescription {
	name: string,
	description: string,
	startDate: Date,
	endDate: Date,
	logoImage: AppImage,
	primaryColor: string,
	secondaryColor: string,
	venue: Venue
}

export interface Venue {
	name: string,
	countryCode: string,
	addressFull: string,
	city: string,
}