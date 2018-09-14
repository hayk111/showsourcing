import { EntityWithAudit } from '~models/_entity.model';
import { User } from '~models/user.model';
import { uuid } from '~utils';

export class Invitation {
	id: string;
	email: string;
	inviter: User;
	accessType: string;
	status: string;
	__typename?= 'Invitation';

	constructor(config?: InvitationConfig) {
		Object.assign(this, config);
		this.id = uuid();
		if (!this.accessType) {
			this.accessType = 'ReadOnly';
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
}

export class InvitationUser {
	id: string;
	email: string;
	inviterFirstName: string;
	inviterLastName: string;
	accessType: string;
	status: string;
	__typename?= 'Invitation';

	constructor(config?: InvitationUserConfig) {
		Object.assign(this, config);
		this.id = uuid();
		if (!this.accessType) {
			this.accessType = 'ReadOnly';
		}
		if (!this.status) {
			this.status = 'pending';
		}
	}
}

export interface InvitationUserConfig {
	email: string;
	inviterFirstName: string;
	inviterLastName: string;
	accessType?: string;
	status?: string;
}
