import { uuid } from '~utils';

export class Company {
	constructor(config?: Company) {
		Object.assign(this, config);
	}
	__typename? = 'Company';
	id?: string;
	name?: string | null;
	ownerUserId?: string | null;
	createdByUserId?: string | null;
	createdOn?: number | null;
	lastUpdatedByUserId?: string | null;
	lastUpdatedOn?: number | null;
	_version?: number | null;
}
