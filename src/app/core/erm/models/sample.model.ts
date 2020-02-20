import { AppImage } from './app-image.model';
import { Price } from './price.model';
import { ExtendedField } from './extended-field.model';
import { Entity } from './_entity.model';
import { User } from './user.model';
import { Product } from './product.model';
import { Supplier } from './supplier.model';
import { SampleStatus } from './sample-status.model';

export class Sample extends Entity<Sample> {
	name?: string;
	reference ?= '';
	description ?= '';
	assignee?: User;
	product?: Product;
	supplier?: Supplier;
	status?: SampleStatus;
	archived ?= false;
	comments?: Comment[];
	images?: AppImage[];
	trackingNumber?: string;
	shippingCompany?: string;
	lastUpdatedBy?: User;
	price?: Price;
	paid ?= false;
	type ?= '';
	extendedFields?: ExtendedField[];
	__typename ?= 'Sample';
}
