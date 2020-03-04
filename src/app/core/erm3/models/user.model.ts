import { Lang } from '../../../API.service';

export class User {
	__typename? = 'User';
	id?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string | null;
	preferredLanguage?: Lang | null;
	avatar?: string | null;
	createdAt?: number | null;
	_version?: number;
	_deleted?: boolean | null;
	_lastChangedAt?: number;
}
