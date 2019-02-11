import { uuid } from '~utils';


export class Status {
	id?: string;
	name?: string;
	category ?= 'inProgress';
	step?: number;
	inWorkflow ?= true;
	// final ?= false; // until we add it to the model

	constructor(config: any) {
		this.id = uuid();
		Object.assign(this, config);
	}
}

