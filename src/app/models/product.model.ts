import { Supplier } from './supplier.model';
import { AppImage } from './app-image.model';
import { Price } from './price.model';
import { Category } from './category.model';
import { Entity } from './_entity.model';
import { ProductStatus } from './product-status.model';
import { Tag } from './tag.model';
import { ProductVote } from './product-vote.model';
import { Packaging } from './packaging.model';
import { PriceMatrix } from './price-matrix.model';

export class Product extends Entity<Product> {
	name?: string;
	supplier?: Supplier;
	images?: AppImage[];
	price?: Price;
	category?: Category;
	description?: string;
	event?: Event;
	favorite?: boolean;
	status?: ProductStatus;
	tags?: Tag[];
	minimumOrderQuantity?: number;
	moqDescription?: string;
	votes?: ProductVote[];
	score?: number;
	innerCarton?: Packaging
	masterCarton?: Packaging
	priceMatrix?: PriceMatrix
	leadTimeValue?: number;
	leadTimeUnit?: string;
	sample?: boolean;
	samplePrice?: number;
	archived?: boolean;
	deleted?: boolean;
}