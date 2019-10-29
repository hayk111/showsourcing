import { Attachment, Project, User } from '~models';
import { EntityWithAudit } from '~models/_entity.model';
import { AppImage } from '~models/app-image.model';
import { Category } from '~models/category.model';
import { Comment } from '~models/comment.model';
import { Packaging } from '~models/packaging.model';
import { PriceMatrix } from '~models/price-matrix.model';
import { Price } from '~models/price.model';
import { ProductStatus } from '~models/product-status.model';
import { ProductVote } from '~models/product-vote.model';
import { Supplier } from '~models/supplier.model';
import { Tag } from '~models/tag.model';

import { Event } from './event.model';
import { ExtendedField } from './extended-field.model';
import { Sample } from './sample.model';
import { Task } from './task.model';


export class Product extends EntityWithAudit<ProductConfig> {
	id?: string;
	archived ?= false;
	assignee?: User;
	attachments?: Attachment[];
	category?: Category;
	comments?: Comment[];
	description?: string;
	event?: Event;
	extendedFields?: ExtendedField[];
	favorite ?= false;
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
	votes?: ProductVote[];
	__typename ?= 'Product';

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

