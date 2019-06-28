import { User } from '~models/user.model';
import { uuid } from '~utils';
import { Team } from './team.model';

export class Invitation {
	id: string;
	email: string;
	inviter: User;
	accessType: string;
	status: string;
	team?: Team;
	inviterFirstName?: string;
	inviterLastName?: string;
	teamName?: string;
	teamId?: string;
	__typename?= 'Invitation';


	constructor(config?: InvitationConfig) {
		Object.assign(this, config);
		this.id = uuid();
		if (!this.accessType) {
			this.accessType = 'Contributor';
		}
		if (!this.status) {
			this.status = 'pending';
		}
	}
}

export interface InvitationConfig {
	email: string;
	inviter: User;
	accessType?: string;
	status?: string;
	team?: Team;
}
