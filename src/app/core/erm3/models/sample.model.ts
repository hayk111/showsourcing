import { Typename } from '../typename.type';
import { Image, Product, SampleStatus, Supplier, Team, User } from './index';
import { Entity } from './_entity.model';

export class Sample extends Entity<Sample> {
	__typename?: Typename = 'Sample';
	id?: string;
	teamId?: string;
	team?: Team | null;
	name?: string;
	status?: SampleStatus;
	assignee?: User;
	description?: string;
	linkedProductId?: string;
	linkedProduct?: Product | null;
	linkedSupplierId?: string;
	linkedSupplier?: Supplier;
	images?: Image | null;
	price?: {
		__typename?: 'Price';
		currency?: string | null;
		value?: number | null;
		baseCurrencyValue?: number | null;
		label?: string | null;
		moq?: number | null;
	};
	paid?: boolean;
	archived?: boolean | null;
	reference?: string | null;
	referenceKey?: number | null;
	comments?: any;
	properties?: any;
}
