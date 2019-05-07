import { Attachment, Project, User, IncoTerm, Harbour } from '~models';
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

export class Product extends EntityWithAudit<ProductConfig> {
	id?: string;
	archived?= false;
	assignee?: User;
	attachments?: Attachment[];
	category?: Category;
	cbm?: number;
	comments?: Comment[];
	description?: string;
	event?: Event;
	extendedFields?: ExtendedField[];
	favorite?: boolean;
	images?: AppImage[];
	incoTerm?: string;
	harbour?: string;
	innerCarton?: Packaging;
	leadTimeUnit?: string;
	leadTimeValue?: number;
	masterCarton?: Packaging;
	minimumOrderQuantity?: number;
	moqDescription?: string;
	name?: string;
	pcsPer20ft?: number;
	pcsPer40ft?: number;
	pcsPer40ftIQ?: number;
	price?: Price;
	priceMatrix?: PriceMatrix;
	productCount?: number;
	projects?: Project[];
	sample?: boolean;
	samplePrice?: number;
	score?: number;
	status?: ProductStatus;
	statushistory?: ProductStatus[];
	supplier?: Supplier;
	tags?: Tag[];
	taskCount?: number;
	votes?: ProductVote[];
	__typename?= 'Product';

}

export interface ProductConfig {
	id?: string;
	category?: Category;
	comments?: Comment[];
	description?: string;
	event?: Event;
	favorite?: boolean;
	images?: AppImage[];
	innerCarton?: Packaging;
	leadTimeUnit?: string;
	leadTimeValue?: number;
	masterCarton?: Packaging;
	minimumOrderQuantity?: number;
	moqDescription?: string;
	name?: string;
	price?: Price;
	priceMatrix?: PriceMatrix;
	status?: ProductStatus;
	statushistory?: ProductStatus[];
	supplier?: Supplier;
	tags?: Tag[];
}

