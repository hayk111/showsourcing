import { uuid } from '~utils';


export class Status {
	id?: string;
	name?: string;
	category?: string;
	step?: number;
	inWorkflow ?= true;
	final?: boolean;

	constructor(config: any) {
		this.id = uuid();
		Object.assign(this, config);
	}
}

