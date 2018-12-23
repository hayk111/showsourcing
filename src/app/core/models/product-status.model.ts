import { Status } from './status.model';

export class ProductStatus extends Status {

	__typename?= 'ProductStatus';

	constructor(config: ProductStatusConfig) {
		super(config);
	}
}

export interface ProductStatusConfig {
	id: string;
}

