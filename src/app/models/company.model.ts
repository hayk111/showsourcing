import { uuid } from '~utils';


export class Company {
	id: string;
	name: string;
	__typename ?= 'Company';

	constructor(config: CompanyConfig) {
		Object.assign(this, config);
		this.id = uuid();
	}
}

export interface CompanyConfig {
	name: string;
}
