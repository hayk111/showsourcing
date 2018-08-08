import { Price } from '~models/price.model';
import { Packaging } from '~models/packaging.model';
import { PriceMatrix } from '~models/price-matrix.model';
import { BaseEntity } from '~models/_entity.model';

export class Quote extends BaseEntity<QuoteConfig> {
	id: string;
	status: string; // possible values: pending, done, declined
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

export interface QuoteConfig {
	status: string; // possible values: pending, done, declined
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
