import { Status } from './status.model';

export class SupplierStatus extends Status {
	__typename ?= 'SupplierStatus';
	constructor(config: SupplierStatus) {
		super(config);
	}
}

export interface SupplierStatusConfig {
	id: string;
}
