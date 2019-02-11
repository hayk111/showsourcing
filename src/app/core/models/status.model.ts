

export class Status {
	id?: string;
	name?: string;
	category?: string;
	step?: number;
	inWorkflow?: boolean;
	final?: boolean;

	constructor(config: any) {
		Object.assign(this, config);
	}
}

