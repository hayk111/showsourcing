import { Category } from '../category';
import { Tag } from '../tag';
import { uuid } from '~utils';

export class Supplier {
	favorite: boolean;
	status: string;
	supplierType: string;
	categories: Array<Category>;
	counters: any;
	countryCode: string;
	createdByUserId: string;
	creationDate: number;
	id: string;
	lastModifiedDate: number;
	lastUpdatedByUserId: string;
	name: string;
	rating: number;
	tags: Array<Tag>;
	teamId: string;
	email: string;
	website: string;
	phone: string;
	description: string;
	pending = true;
	minimumOrderQuantity: number;
	leadTime: number;
	phoneNumber: string;
	address: string;
	type: string;
	incoTerm: string;
	harbour: string;
	eventId: string;
	categoryIds: Array<String>;
	tagIds: Array<String>;
	leadTimeValue: number;

	constructor(name: string, userId: string) {
		this.name = name;
		this.createdByUserId = userId;
		this.creationDate = Date.now();
		this.id = uuid();
	}
}
