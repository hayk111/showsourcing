import { Product } from '~core/erm/models/product.model';
import { User } from './user.model';
import { Entity } from './_entity.model';

export class ProductVoteRequest extends Entity<ProductVoteRequest> {
	comment?: string;
	product?: Product;
	users?: User[];
	__typename ?= 'ProductVoteRequest';
}


