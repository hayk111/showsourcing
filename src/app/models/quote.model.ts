import { Packaging } from '~models/packaging.model';
import { PriceMatrix } from '~models/price-matrix.model';
import { Price } from '~models/price.model';
import { Supplier } from '~models/supplier.model';
import { Product } from '~models/product.model';
import { uuid } from '~utils';
import { RequestStatus } from '~utils/constants/request-status.enum';

export class Quote {
	id: string;
	status: string; // possible values: pending, done, declined
	comment?: string;
	// Basic product fields
	name: string;
	description?: string;
	harbour?: string;
	incoTerms?: string;
	innerCarton?: Packaging;
	leadTimeUnit?: string;
	leadTimeValue?: number;
	masterCarton?: Packaging;
	minimumOrderQuantity?: number;
	moqDescription?: string;
	price?: Price;
	priceMatrix?: PriceMatrix;
	product?: Product;
	reference?: string;
	sample?: boolean;
	samplePrice?: number;
	supplier?: Supplier;

	__typename ?= 'Quote';

	constructor(config: QuoteConfig) {
		Object.assign(this, config);
		this.id = uuid();
		this.status = RequestStatus.PENDING;
	}
}

export interface QuoteConfig {
	comment?: string;
	// Basic product fields
	name: string;
	price?: Price;
	description?: string;
	minimumOrderQuantity?: number;
	moqDescription?: string;
	innerCarton?: Packaging;
	masterCarton?: Packaging;
	priceMatrix?: PriceMatrix;
	leadTimeValue?: number;
	leadTimeUnit?: string;
	sample?: boolean;
	samplePrice?: number;
}
