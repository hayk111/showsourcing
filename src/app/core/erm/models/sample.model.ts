import { EntityWithAudit } from '~core/erm/models/_entity.model';
import { User, Product, Supplier, SampleStatus } from '~core/erm/models';
import { AppImage } from './app-image.model';
import { Price } from './price.model';
import { ExtendedField } from './extended-field.model';

export class Sample extends EntityWithAudit<SampleConfig> {
	name?: string;
	reference?= '';
	description?= '';
	assignee?: User;
	product?: Product;
	supplier?: Supplier;
	status?: SampleStatus;
	archived?= false;
	comments?: Comment[];
	images?: AppImage[];
	trackingNumber?: string;
	shippingCompany?: string;
	lastUpdatedBy?: User;
	price?: Price;
	paid?= false;
	type?= '';
	extendedFields?: ExtendedField[];
	__typename?= 'Sample';

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
