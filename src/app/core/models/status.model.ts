import { ID, uuid } from '~utils';

export class Status {
	id?: ID;
	name?: string;
	category?: string;
	step?: number;
	inWorkflow?= true;
	final?= false;
	deleted?= false;

	constructor(config: StatusConfig) {
		Object.assign(this, config);
		if (!config.id) this.id = uuid();
	}
}

export interface StatusConfig {
	id?: string;
	name?: string;
	step?: number;
	category?: string;
}
