import { Team } from './team.model';
import { AppImage } from '~models/app-image.model';

export class User {
	id: string;
	firstName?: string;
	lastName?: string;
	name?: string;
	phoneNumber?: string;
	companyName?: string;
	email?: string;
	currentTeam?: Team;
	preferredLanguage?: string;
	realmServerName?: string;
	realmPath?: string;
	logoImage?: AppImage;
}
