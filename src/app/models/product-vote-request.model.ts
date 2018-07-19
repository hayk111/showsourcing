import { BaseEntity } from '~models/_entity.model';
import { Product } from '~models/product.model';
import { User } from '~models';

export class ProductVoteRequest extends BaseEntity<ProductVoteRequestConfig> {
	comment?: string;
	product: Product;
	users: User[];
	constructor(config: ProductVoteRequestConfig) {
		super(config);
	}
}

export interface ProductVoteRequestConfig {
	comment?: string;
	product: Product;
	users: User[];
}

