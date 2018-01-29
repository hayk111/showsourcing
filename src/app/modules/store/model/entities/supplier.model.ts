import { Tag } from './tag.model';
import { Counters } from './counters.interface';
import { Category } from './category.model';


export interface Supplier {
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
}

