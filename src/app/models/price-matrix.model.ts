import { Price } from './price.model';

export interface PriceMatrix {
	id: string;
	rows: PriceMatrixRow[];
}

export interface PriceMatrixRow {
	id: string;
	label: string;
	price: Price;
}
