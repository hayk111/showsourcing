import { ID, uuid } from '~utils';

export const DEFAULT_STATUS_CATEGORY = 'inProgress';
export const NEW_STATUS_ID = 'new-status-id';

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
