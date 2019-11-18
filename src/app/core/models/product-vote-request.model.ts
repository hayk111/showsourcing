import { EntityWithAudit } from '~models/_entity.model';
import { Product } from '~models/product.model';
import { User } from '~models';

export class ProductVoteRequest extends EntityWithAudit<ProductVoteRequestConfig> {
	comment?: string;
	product: Product;
	users: User[];
	__typename ?= 'ProductVoteRequest';

	constructor(config: ProductVoteRequestConfig) {
		super(config);
	}
}

export interface ProductVoteRequestConfig {
	comment?: string;
	product: Product;
	users: User[];
}

