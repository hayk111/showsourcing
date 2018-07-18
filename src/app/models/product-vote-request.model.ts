import { BaseEntity } from '~models/_entity.model';
import { Product } from '~models/product.model';

export class ProductVoteRequest extends BaseEntity<ProductVoteRequestConfig> {
	comment: string;
	product: Product;
	constructor(config: ProductVoteRequestConfig) {
		super(config);
	}
}

export interface ProductVoteRequestConfig {
	comment: string;
	product: Product;
}

