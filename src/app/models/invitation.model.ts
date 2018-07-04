import { BaseEntity } from './_entity.model';
import { User } from './user.model';

export class Invitation extends BaseEntity<InvitationConfig> {
	email: string;
	inviter: User;
}

export interface InvitationConfig {
	email: string;
	inviter: User;
}
