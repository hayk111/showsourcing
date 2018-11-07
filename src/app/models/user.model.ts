import { Team } from '~models/team.model';
import { AppImage } from '~models/app-image.model';

export class User {
	id: string;
	firstName?: string;
	lastName?: string;
	name?: string; // NOT IN REALM ANYMORE
	phoneNumber?: string;
	companyName?: string;
	email?: string;
	currentTeam?: Team;
	preferredLanguage?: string;
	realmServerName?: string;
	realmPath?: string;
	avatar?: AppImage;
	__typename ?= 'User';
}
