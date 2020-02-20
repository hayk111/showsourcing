import { Entity } from '~core/erm/models/_entity.model';
import { AppImage, imageMock } from './app-image.model';
import { Attachment } from './attachment.model';
import { Category } from './category.model';
import { ExtendedField } from './extended-field.model';
import { ProductVote } from './product-vote.model';
import { Sample } from './sample.model';
import { SupplierStatus } from './supplier-status.model';
import { SupplierType } from './supplier-type.model';
import { Tag } from './tag.model';
import { Task } from './task.model';
import { User } from './user.model';
import { Comment } from './comment.model';


export class Supplier extends Entity<Supplier> {
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
	favorite ?= false;
	globalDatabaseId?: string;
	status?: SupplierStatus;
	comments?: Comment[];
	lastUpdatedBy?: User;
	assignee?: User;
	votes?: ProductVote[];
	archived ?= false;
	extendedFields?: ExtendedField[];
	tasksLinked?: { count: number, items: Task[] };
	samplesLinked?: { count: number, items: Sample[] };
	productsLinked?: { count: number };
	contactsLinked?: { count: number };
	tasksLinkedAssignedToMe?: { count: number };
	samplesLinkedAssignedToMe?: { count: number };
	tasksLinkedUndone?: { count: number, items: Task[] };
	__typename ?= 'Supplier';

}

export const supplierMock: Supplier = new Supplier({
	name: 'supplier',
	images: [imageMock],
	logoImage: imageMock,
});
