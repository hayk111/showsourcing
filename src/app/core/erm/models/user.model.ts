import { Entity } from './_entity.model';
import { AppImage } from './app-image.model';

export class User extends Entity<User> {
	__typename ?= 'User';
	email?: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	preferredLanguage?: string;
	avatar?: AppImage;
	creationDate?: Date;

}
