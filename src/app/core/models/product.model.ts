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

import { ExtendedField } from './extended-field.model';
import { PickerField } from '~shared/selectors';

export const productFields: PickerField[] = [
	{ name: 'name', type: 'text' },
	{ name: 'category', type: 'selector' },
	{ name: 'supplier', type: 'selector' },
	{ name: 'price', type: 'price' },
	{ name: 'event', type: 'selector' },
	{ name: 'tag', type: 'selector', metadata: { multiple: true } },
	{ name: 'favorite', type: 'boolean' },
	// { name: 'inner carton', attribute: 'innerCarton', type: 'packaging' },
	// { name: 'master carton', attribute: 'masterCarton', type: 'packaging' },
	{ name: 'moq', attribute: 'minimumOrderQuantity', type: 'number' },
	{ name: 'sample', type: 'boolean' },
	{ name: 'sample price', attribute: 'samplePrice', type: 'number' },
	{ name: 'projects', type: 'selector', metadata: { multiple: true } },
	{ name: 'status', type: 'status' }
];

export class Product extends EntityWithAudit<ProductConfig> {
	id?: string;
	name?: string;
	comments?: Comment[];
	supplier?: Supplier;
	images?: AppImage[];
	attachments?: Attachment[];
	price?: Price;
	category?: Category;
	description?: string;
	event?: Event;
	favorite?: boolean;
	status?: ProductStatus;
	statushistory?: ProductStatus[];
	tags?: Tag[];
	minimumOrderQuantity?: number;
	moqDescription?: string;
	votes?: ProductVote[];
	score?: number;
	innerCarton?: Packaging;
	masterCarton?: Packaging;
	priceMatrix?: PriceMatrix;
	leadTimeValue?: number;
	leadTimeUnit?: string;
	sample?: boolean;
	samplePrice?: number;
	archived?= false;
	taskCount?: number;
	productCount?: number;
	projects?: Project[];
	assignee?: User;
	extendedFields?: ExtendedField[];
	__typename?= 'Product';

}

export interface ProductConfig {
	id?: string;
	name?: string;
	supplier?: Supplier;
	images?: AppImage[];
	comments?: Comment[];
	price?: Price;
	category?: Category;
	description?: string;
	event?: Event;
	favorite?: boolean;
	status?: ProductStatus;
	statushistory?: ProductStatus[];
	tags?: Tag[];
	minimumOrderQuantity?: number;
	moqDescription?: string;
	innerCarton?: Packaging;
	masterCarton?: Packaging;
	priceMatrix?: PriceMatrix;
	leadTimeValue?: number;
	leadTimeUnit?: string;
}

