
export class User {
	__typename ? = 'User';
	id?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string | null;
	preferredLanguage?: 'EN' | 'FR' | 'CN';
	avatar?: string | null;
	createdAt?: number | null;
	_deleted?: boolean | null;
	_lastChangedAt?: number;
}
