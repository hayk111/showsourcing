import { Supplier } from '~models/supplier.model';
import { AppImage } from '~models/app-image.model';
import { Price } from '~models/price.model';
import { Category } from '~models/category.model';
import { EntityWithAudit } from '~models/_entity.model';
import { ProductStatus } from '~models/product-status.model';
import { Tag } from '~models/tag.model';
import { ProductVote } from '~models/product-vote.model';
import { Packaging } from '~models/packaging.model';
import { PriceMatrix } from '~models/price-matrix.model';
import { Project, Attachment } from '~models';
import { Comment } from '~models/comment.model';

export class Product extends EntityWithAudit<ProductConfig> {
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
	archived ?= false;
	taskCount?: number;
	productCount?: number;
	projects?: Project[];
	__typename ?= 'Product';

}

export interface ProductConfig {
	name: string;
	supplier?: Supplier;
	images?: AppImage[];
	comments?: Comment[];
	price?: Price;
	category?: Category;
	description?: string;
	event?: Event;
	favorite?: boolean;
	status?: ProductStatus[];
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
