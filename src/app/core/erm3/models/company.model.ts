import { Lang } from '../../../API.service';

export class Company {
	constructor(config?: Company) {
		Object.assign(this, config);
	}
	__typename? = 'Company';
	id?: string;
	name?: string;
	ownerUserId?: string;
	owner?: {
		__typename?: 'User';
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
	};
	createdByUserId?: string;
	createdBy?: {
		__typename?: 'User';
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
	};
	createdAt?: number;
	lastUpdatedByUserId?: string;
	lastUpdatedBy?: {
		__typename?: 'User';
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
	} | null;
	lastUpdatedAt?: number | null;
	_version?: number;
	_deleted?: boolean | null;
	_lastChangedAt?: number;
}
