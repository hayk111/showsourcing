import { AppImage, Contact } from '~models';

import { EntityWithAudit } from '~models/_entity.model';
import { Category } from '~models/category.model';
import { SupplierStatus } from '~models/supplier-status.model';
import { SupplierType } from '~models/supplier-type.model';
import { Tag } from '~models/tag.model';

export class Supplier extends EntityWithAudit<SupplierConfig> {
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
	contacts?: Contact[];
	favorite ?= false;
	globalDatabaseId?: string;
	status?: SupplierStatus;
	statusHistory?: SupplierStatus[];
	productCount ?= 0;
	taskCount ?= 0;
	__typename ?= 'Supplier';
}

export interface SupplierConfig {
	name: string;
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
	contacts?: Contact[];
	favorite?: boolean;
	status?: SupplierStatus;
}
