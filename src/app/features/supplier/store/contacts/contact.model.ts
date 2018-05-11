import { AppImage, Supplier } from '~app/entity';

export interface Contact {
	id?: string;
	name?: string;
	phoneNumber?: string;
	email?: string;
	businessCardImage?: AppImage;
	jobTitle?: string;
	supplier?: Supplier;
	audit?: any;
	deleted?: boolean;
}
