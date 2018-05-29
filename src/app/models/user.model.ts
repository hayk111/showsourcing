import { Team } from './team.model';

export class User {
	id: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	companyName: string;
	email: string;
	currentTeam: Team;
	preferredLanguage: string;
	teams: any[];
}
