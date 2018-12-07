export class ProductStatus {
	id?: string;
	name?: string;
	inWorkflow?: boolean;
	category?: string;
	step?: number;

	__typename ?= 'ProductStatus';

	constructor(config: ProductStatusConfig) {
		Object.assign(this, config);
	}
}

export interface ProductStatusConfig {
	id: string;
}

