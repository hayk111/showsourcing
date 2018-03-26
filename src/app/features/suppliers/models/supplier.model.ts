import { Category, Counters, Tag } from '~store';
import { uuid } from '~utils';

export class Supplier {
	favorite: boolean;
	status: string;
	supplierType: string;
	categories: Array<Category>;
	counters: Counters;
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

	constructor(name: string, userId: string) {
		this.name = name;
		this.createdByUserId = userId;
		this.creationDate = Date.now();
		this.id = uuid();
	}
}
