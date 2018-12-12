export class SampleStatus {
	id?: string;
	name?: string;
	inWorkflow?: boolean;
	category?: string;
	step?: number;
	__typename ?= 'SampleStatus';

	constructor(config: SampleStatusConfig) {
		Object.assign(this, config);
	}
}

export interface SampleStatusConfig {
	id: string;
}
