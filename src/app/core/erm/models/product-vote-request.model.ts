import { EntityWithAudit } from '~core/erm/models/_entity.model';
import { Product } from '~core/erm/models/product.model';
import { User } from '~core/erm/models';

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

