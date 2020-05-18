import { Typename } from '../typename.type';
import { Category } from './category.model';
import { Image } from './image.model';
import { Supplier } from './supplier.model';
import { Tag } from './tag.model';
import { Team } from './team.model';
import { User } from './user.model';
import { Entity } from './_entity.model';
import { Attachment } from './attachment.model';
import { ProjectProduct } from './project-product.model';


export class Product extends Entity<Product> {
	__typename?: Typename = 'Product';
	id?: string;
	teamId?: string;
	team?: Team | null;
	name?: string;
	supplier?: Supplier | null;
	images?: Array<Image | null> | null;
	price?: {
		__typename?: 'Price';
		currency?: string | null;
		value?: number | null;
		baseCurrencyValue?: number | null;
		label?: string | null;
		moq?: number | null;
	} | null;
	category?: Category | null;
	description?: string | null;
	favorite?: boolean | null;
	assigneeId?: string;
	assignee?: User | null;
	tags?: {
		__typename?: 'ModelTagConnection';
		items?: Array<Tag | null> | null;
		nextToken?: string | null;
		startedAt?: number | null;
	} | null;
	score?: number | null;
	attachments?: {
		__typename?: 'ModelAttachmentConnection';
		items?: Array<Attachment | null> | null;
		nextToken?: string | null;
		startedAt?: number | null;
	} | null;
	extendedFields?: Array<{
		__typename?: 'FieldValue';
		name?: string;
		value?: string;
	} | null> | null;
	incoTerm?: string | null;
	harbour?: string | null;
	masterCbm?: number | null;
	quantityPer20ft?: number | null;
	quantityPer40ft?: number | null;
	quantityPer40ftHC?: number | null;
	itemDimension?: {
		__typename?: 'Packaging';
		height?: number | null;
		width?: number | null;
		length?: number | null;
		unit?: string | null;
		itemsQuantity?: number | null;
		weight?: number | null;
		weightUnit?: string | null;
		type?: string | null;
	} | null;
	innerCarton?: {
		__typename?: 'Packaging';
		height?: number | null;
		width?: number | null;
		length?: number | null;
		unit?: string | null;
		itemsQuantity?: number | null;
		weight?: number | null;
		weightUnit?: string | null;
		type?: string | null;
	} | null;
	masterCarton?: {
		__typename?: 'Packaging';
		height?: number | null;
		width?: number | null;
		length?: number | null;
		unit?: string | null;
		itemsQuantity?: number | null;
		weight?: number | null;
		weightUnit?: string | null;
		type?: string | null;
	} | null;
	priceMatrix?: Array<{
		__typename?: 'Price';
		currency?: string | null;
		value?: number | null;
		baseCurrencyValue?: number | null;
		label?: string | null;
		moq?: number | null;
	} | null> | null;
	leadTime?: {
		__typename?: 'LeadTime';
		value?: number | null;
		// unit?: LeadTimeUnit | null;
	} | null;
	sample?: boolean | null;
	samplePrice?: {
		__typename?: 'Price';
		currency?: string | null;
		value?: number | null;
		baseCurrencyValue?: number | null;
		label?: string | null;
		moq?: number | null;
	} | null;
	projects?: {
		__typename?: 'ModelProjectProductConnection';
		items?: Array<ProjectProduct | null> | null;
		nextToken?: string | null;
		startedAt?: number | null;
	} | null;
	archived?: boolean | null;
	reference?: string | null;
	referenceKey?: number | null;
	properties?: any;
	comments?: any;
	votes?: any[];
}
