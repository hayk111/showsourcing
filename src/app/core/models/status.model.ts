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
		if (!config.id) this.id = uuid();
		Object.assign(this, config);
	}
}

export interface StatusConfig {
	id?: string;
	name?: string;
	step?: number;
	category?: string;
}

