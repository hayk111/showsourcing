import { Status, StatusConfig } from './status.model';

export class SupplierStatus extends Status {

	__typename ?= 'SupplierStatus';

	constructor(config: StatusConfig) {
		super(config);
	}
}
