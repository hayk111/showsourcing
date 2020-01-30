import { Attachment, Project, User } from '~core/orm/models';
import { EntityWithAudit } from '~core/orm/models/_entity.model';
import { AppImage } from '~core/orm/models/app-image.model';
import { Category } from '~core/orm/models/category.model';
import { Comment } from '~core/orm/models/comment.model';
import { Packaging } from '~core/orm/models/packaging.model';
import { PriceMatrix } from '~core/orm/models/price-matrix.model';
import { Price } from '~core/orm/models/price.model';
import { ProductStatus } from '~core/orm/models/product-status.model';
import { ProductVote } from '~core/orm/models/product-vote.model';
import { Supplier } from '~core/orm/models/supplier.model';
import { Tag } from '~core/orm/models/tag.model';

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

