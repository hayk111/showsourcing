import { EntityWithAudit } from '~models/_entity.model';
import { User, Product, Supplier, SampleStatus } from '~models';
import { AppImage } from './app-image.model';
import { Price } from './price.model';

export class Sample extends EntityWithAudit<SampleConfig> {
	name?: string;
	reference ?= '';
	description ?= '';
	assignee?: User;
	product?: Product;
	supplier?: Supplier;
	status?: SampleStatus;
	comments?: Comment[];
	images?: AppImage[];
	trackingNumber?: string;
	shippingCompany?: string;
	price?: Price;
	paid ?= false;
	__typename ?= 'Sample';

	constructor(config: SampleConfig) {
		super(config);
	}
}

export interface SampleConfig {
	name?: string;
	assignee?: User;
	product?: Product;
	supplier?: Supplier;
}
