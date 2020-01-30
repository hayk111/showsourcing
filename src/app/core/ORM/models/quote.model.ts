import { Packaging } from '~core/ORM/models/packaging.model';
import { PriceMatrix } from '~core/ORM/models/price-matrix.model';
import { Price } from '~core/ORM/models/price.model';
import { Product } from '~core/ORM/models/product.model';
import { Supplier } from '~core/ORM/models/supplier.model';
import { RequestStatus, uuid } from '~utils';

export class Quote {
	id: string;
	status: RequestStatus;
	comment?: string;
	// Basic product fields
	name: string;
	creationDate = new Date();
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

	__typename?= 'Quote';

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
