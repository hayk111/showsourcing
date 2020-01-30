import { EntityWithAudit } from '~core/orm/models/_entity.model';
import { Product } from '~core/orm/models/product.model';
import { User } from '~core/orm/models';

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

