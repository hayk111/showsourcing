import { Tag } from '~store';
import { Counters } from '~store';
import { Category } from '~store';
import { uuid } from '~store';


export class Supplier {
	advancedInfos: {favorite: boolean, status: string, supplierType: string };
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
	pending = true;

	constructor(name: string, userId: string) {
		this.name = name;
		this.createdByUserId = userId;
		this.creationDate = Date.now();
		this.id = uuid();
	}
}

