import { Status } from './status.model';

export class SampleStatus extends Status {

	__typename ?= 'SampleStatus';

	constructor(config: SampleStatusConfig) {
		super(config);
	}
}

export interface SampleStatusConfig {
	id: string;
}
