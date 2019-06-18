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
import { PickerField } from '~shared/selectors';

export const productFields: PickerField[] = [
	{ name: 'name', type: 'text' },
	{ name: 'assignee', type: 'selector', metadata: { ermName: 'user' } },
	{ name: 'description', type: 'text' },
	{ name: 'category', type: 'selector' },
	{ name: 'supplier', type: 'selector' },
	{ name: 'price', type: 'price' },
	{ name: 'event', type: 'selector' },
	{ name: 'tags', type: 'selector', metadata: { multiple: true } },
	{ name: 'favorite', type: 'boolean' },
	{ name: 'extended fields', attribute: 'extendedFields', type: 'extendedField' },
	{ name: 'inner carton', attribute: 'innerCarton', type: 'packaging' },
	{ name: 'master carton', attribute: 'masterCarton', type: 'packaging' },
	// { name: 'lead time', attribute: 'leadTime', type: 'number' },
	// { name: 'lead time unit', attribute: 'leadTimeUnit', type: 'text' },
	{ name: 'moq', attribute: 'minimumOrderQuantity', type: 'number' },
	{ name: 'moq description', attribute: 'moqDescription', type: 'text' },
	{ name: 'votes', attribute: 'votes', type: 'votes' },
	{ name: 'sample', type: 'boolean' },
	{ name: 'sample price', attribute: 'samplePrice', type: 'price' },
	{ name: 'projects', type: 'selector', metadata: { multiple: true } },
	{ name: 'status', type: 'status' },
];

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
	productCount?: number;
	projects?: Project[];
	quantityPer20ft?: number;
	quantityPer40ft?: number;
	quantityPer40ftHC?: number;
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

