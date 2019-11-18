import { Status, StatusConfig } from './status.model';

export class SampleStatus extends Status {

	__typename ?= 'SampleStatus';

	constructor(config: StatusConfig) {
		super(config);
	}
}
