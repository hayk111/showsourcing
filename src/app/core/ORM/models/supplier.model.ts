import { AppImage, Attachment, Comment, ExtendedField } from '~core/ORM/models';
import { EntityWithAudit } from '~core/ORM/models/_entity.model';
import { imageMock } from '~core/ORM/models/app-image.model';
import { Category } from '~core/ORM/models/category.model';
import { SupplierStatus } from '~core/ORM/models/supplier-status.model';
import { SupplierType } from '~core/ORM/models/supplier-type.model';
import { Tag } from '~core/ORM/models/tag.model';

import { ProductVote } from './product-vote.model';
import { Sample } from './sample.model';
import { Task } from './task.model';
import { User } from './user.model';


export class Supplier extends EntityWithAudit<SupplierConfig> {
	reference?: string;
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
	votes?: ProductVote[];
	archived?= false;
	extendedFields?: ExtendedField[];
	tasksLinked?: { count: number, items: Task[] };
	samplesLinked?: { count: number, items: Sample[] };
	productsLinked?: { count: number };
	contactsLinked?: { count: number };
	tasksLinkedAssignedToMe?: { count: number };
	samplesLinkedAssignedToMe?: { count: number };
	tasksLinkedUndone?: { count: number, items: Task[] };
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
