import { Category } from './category.model';
import { Tag } from './tag.model';
import { AppImage } from '~models';
import { Audit } from './audit.model';
import { uuid } from '~utils';
import { BaseEntity } from './_entity.model';
import { SupplierType } from './supplier-type.model';
import { SupplierStatus } from './supplier-status.model';

export class Supplier extends BaseEntity<Supplier> {
	name?: string;
	fullName?: string;
	description?: string;
	images?: AppImage[];
	logoImage?: AppImage;
	supplierType?: SupplierType;
	website?: string;
	country?: string;
	address?: string;
	officeEmail?: string;
	officePhone?: string;
	incoTerm?: string;
	harbour?: string;
	generalMOQ?: number;
	generalLeadTime?: number;
	tags?: Tag[];
	categories?: Category[];
	favorite?: boolean;
	globalDatabaseId?: string;
	status?: SupplierStatus;
	productCount?: number;
}

