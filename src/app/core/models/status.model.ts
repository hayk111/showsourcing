import { ID, uuid } from '~utils';

export const DEFAULT_STATUS_CATEGORY = 'inProgress';
export const NEW_STATUS_ID = 'new-status-id';
export enum TaskStatus {
	DONE = '_Done',
	PENDING = '_Pending',
	OVERDUE = '_Overdue',
}

export class Status {
	id?: ID;
	name?: string;
	category?: string;
	step?: number;
	inWorkflow ?= true;
	final ?= false;
	deleted ?= false;

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
