import { uuid } from '~utils';
import { User } from '~models/user.model';

export class Company {
	id: string;
	name?: string;
	owner?: User;
	__typename ?= 'Company';

	constructor(config: CompanyConfig) {
		Object.assign(this, config);
		this.id = uuid();
	}
}

export interface CompanyConfig {
	name: string;
}
