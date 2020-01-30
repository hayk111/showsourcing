import { Attachment, Project, User } from '~core/ORM/models';
import { EntityWithAudit } from '~core/ORM/models/_entity.model';
import { AppImage } from '~core/ORM/models/app-image.model';
import { Category } from '~core/ORM/models/category.model';
import { Comment } from '~core/ORM/models/comment.model';
import { Packaging } from '~core/ORM/models/packaging.model';
import { PriceMatrix } from '~core/ORM/models/price-matrix.model';
import { Price } from '~core/ORM/models/price.model';
import { ProductStatus } from '~core/ORM/models/product-status.model';
import { ProductVote } from '~core/ORM/models/product-vote.model';
import { Supplier } from '~core/ORM/models/supplier.model';
import { Tag } from '~core/ORM/models/tag.model';

import { Event } from './event.model';
import { ExtendedField } from './extended-field.model';
import { Sample } from './sample.model';
import { Task } from './task.model';


export class Product extends EntityWithAudit<ProductConfig> {
	id?: string;
	archived?= false;
	assignee?: User;
	attachments?: Attachment[];
	category?: Category;
	comments?: Comment[];
	description?: string;
	event?: Event;
	extendedFields?: ExtendedField[];
	favorite?= false;
	harbour?: string;
	images?: AppImage[];
	incoTerm?: string;
	innerCarton?: Packaging;
	lastUpdatedBy?: User;
	leadTimeUnit?: string;
	leadTimeValue?: number;
	masterCarton?: Packaging;
	masterCbm?: number;
	minimumOrderQuantity?: number;
	moqDescription?: string;
	name?: string;
	price?: Price;
	priceMatrix?: PriceMatrix;
	productCount?: number;
	projects?: Project[];
	quantityPer20ft?: number;
	quantityPer40ft?: number;
	quantityPer40ftHC?: number;
	reference?: string;
	sample?: boolean;
	samplePrice?: Price;
	score?: number;
	status?: ProductStatus;
	statushistory?: ProductStatus[];
	supplier?: Supplier;
	tags?: Tag[];
	tasksLinked?: { count: number, items: Task[] };
	samplesLinked?: { count: number, items: Sample[] };
	tasksLinkedAssignedToMe?: { count: number };
	samplesLinkedAssignedToMe?: { count: number };
	tasksLinkedUndone?: { count: number, items: Task[] };
	votes?: ProductVote[];
	__typename?= 'Product';

}

export interface ProductConfig {
	id?: string;
	attachments?: Attachment[];
	category?: Category;
	comments?: Comment[];
	description?: string;
	event?: Event;
	extendedFields?: ExtendedField[];
	favorite?: boolean;
	harbour?: string;
	images?: AppImage[];
	incoTerm?: string;
	innerCarton?: Packaging;
	leadTimeUnit?: string;
	leadTimeValue?: number;
	masterCarton?: Packaging;
	masterCbm?: number;
	minimumOrderQuantity?: number;
	moqDescription?: string;
	name?: string;
	price?: Price;
	priceMatrix?: PriceMatrix;
	projects?: Project[];
	quantityPer20ft?: number;
	quantityPer40ft?: number;
	quantityPer40ftHC?: number;
	sample?: boolean;
	samplePrice?: Price;
	status?: ProductStatus;
	statushistory?: ProductStatus[];
	supplier?: Supplier;
	tags?: Tag[];
}

