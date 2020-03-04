import { uuid } from '~utils';

export class Team {
	__typename ?= 'Team';
	constructor(config?: Team) {
		Object.assign(this, config);
	}
	id ?: string;
	name?: string;
	ownerUserId?: string;
	companyId?: string;
	createdByUserId?: string;
	createdOn?: number;
	lastUpdatedByUserId?: string;
	lastUpdatedOn?: number | null;
	_version?: number;
	_deleted?: boolean | null;
	_lastChangedAt?: number;
}
