import { Supplier } from '~core/orm/models/supplier.model';

export class Booth {
	id: string;
	supplier: Supplier;
	boothName: string;
	__typename ?= 'Booth';
}

