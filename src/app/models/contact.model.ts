import { Entity } from './_entity.model';
import { AppImage } from './app-image.model';
import { Supplier } from './supplier.model';

export class Contact extends Entity<Contact>{
	name?: string;
	phoneNumber?: string;
	email?: string;
	businessCardImage?: AppImage;
	jobTitle?: string;
	supplier?: Supplier;
	deleted?: boolean;
}