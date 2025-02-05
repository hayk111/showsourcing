import { AppImage, Attachment, Comment } from '~models';
import { EntityWithAudit } from '~models/_entity.model';
import { imageMock } from '~models/app-image.model';
import { Category } from '~models/category.model';
import { SupplierStatus } from '~models/supplier-status.model';
import { SupplierType } from '~models/supplier-type.model';
import { Tag } from '~models/tag.model';

import { ExtendedField } from './extended-field.model';
import { User } from './user.model';

export class Supplier extends EntityWithAudit<SupplierConfig> {
	name?: string;
	fullName?: string;
	description?: string;
	images?: AppImage[];
	attachments?: Attachment[];
	logoImage?: AppImage;
	supplierType?: SupplierType;
	website?: string;
	country?: string;
	city?: string;
	address?: string;
	officeEmail?: string;
	officePhone?: string;
	incoTerm?: string;
	harbour?: string;
	generalMOQ?: number;
	generalLeadTime?: number;
	tags?: Tag[];
	categories?: Category[];
	favorite?= false;
	globalDatabaseId?: string;
	status?: SupplierStatus;
	comments?: Comment[];
	lastUpdatedBy?: User;
	assignee?: User;
	archived?= false;
	extendedFields?: ExtendedField[];
	tasksLinkedAssignedToMe?: { count: number };
	samplesLinkedAssignedToMe?: { count: number };
	tasksLinkedUndone?: { count: number };
	__typename?= 'Supplier';
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
	favorite?: boolean;
	status?: SupplierStatus;
	comments?: Comment[];
	assignee?: User;
}

export const supplierMock: Supplier = {
	name: 'supplier',
	images: [imageMock],
	logoImage: imageMock,
} as any;
