import { Typename } from '../typename.type';
import { Entity } from './_entity.model';

export class Invitation extends Entity<Invitation> {
	__typename?: Typename = 'Invitation';
	id?: string;
	teamId?: string;
	email?: string;
	firstName?: string | null;
	lastName?: string | null;
	status?: any;
	secret?: string | null;
}

export enum InvitationStatus {
	SENT = 'SENT',
	ACCEPTED = 'ACCEPTED',
	REFUSED = 'REFUSED'
}
