import { Entity } from './_entity.model';
import { Lang, ImageType } from '../../../API.service';
import { Typename } from '../entity-name.type';
import { Team } from './team.model';
import { Supplier } from './supplier.model';
import { Image } from './image.model';
import { Category } from './category.model';
import { User } from './user.model';

export class Product extends Entity<Product> {
	__typename?: Typename = 'Product';
	id?: string;
	teamId?: string;
	team?: Team;
	name?: string;
	supplier?: Supplier;
	images?: Array<Image> | null;
	price?: {
		__typename?: 'Price';
		currency?: string | null;
		value?: number | null;
		baseCurrencyValue?: number | null;
	} | null;
	category?: Category;
	description?: string | null;
	favorite?: boolean | null;
	assigneeId?: string;
	assignee?: User;
	minimumOrderQuantity?: number | null;
	moqDescription?: string | null;
	score?: number | null;
	incoTerm?: string | null;
	harbour?: string | null;
	masterCbm?: number | null;
	quantityPer20ft?: number | null;
	quantityPer40ft?: number | null;
	quantityPer40ftHC?: number | null;
	leadTimeValue?: number | null;
	leadTimeUnit?: string | null;
	sample?: boolean | null;
	samplePrice?: {
		__typename?: 'Price';
		currency?: string | null;
		value?: number | null;
		baseCurrencyValue?: number | null;
	} | null;
	archived?: boolean;
	reference?: string | null;
	referenceKey?: number | null;
	createdByUserId?: string;
	deletedByUSerId?: string | null;
	deletedAt?: number | null;
	lastUpdatedByUserId?: string;
	_version?: number;
	_deleted?: boolean | null;
	_lastChangedAt?: number;
}
