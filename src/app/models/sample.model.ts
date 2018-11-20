import { EntityWithAudit } from '~models/_entity.model';
import { User, Product, Supplier, SampleStatus } from '~models';
import { AppImage } from './app-image.model';
import { Price } from './price.model';

export class Sample extends EntityWithAudit<SampleConfig> {
	name?: string;
	reference?: string;
	description?: string;
	type?: any;
	assignee?: User;
	product?: Product;
	supplier?: Supplier;
	status?: SampleStatus;
	commnets?: Comment[];
	images?: AppImage[];
	price?: Price;
	paid = false;
	__typename ?= 'Sample';
}

export interface SampleConfig {
	name?: string;
	assignee?: User;
	product?: Product;
	supplier?: Supplier;
}
