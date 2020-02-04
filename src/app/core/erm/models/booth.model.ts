import { Supplier } from '~core/erm/models/supplier.model';

export class Booth {
	id: string;
	supplier: Supplier;
	boothName: string;
	__typename ?= 'Booth';
}

