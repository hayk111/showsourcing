import { Entity } from './_entity.model';

export class User extends Entity {
	id?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string | null;
	preferredLanguage?: 'EN' | 'FR' | 'CN';
	avatar?: string | null;
	_version?: number;
	_deleted?: boolean | null;
	_lastChangedAt?: number;
}
