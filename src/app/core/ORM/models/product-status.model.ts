import { Status, StatusConfig } from './status.model';

export class ProductStatus extends Status {

	__typename ?= 'ProductStatus';

	constructor(config: StatusConfig) {
		super(config);
	}
}

export interface ProductStatusConfig {
	id: string;
}
