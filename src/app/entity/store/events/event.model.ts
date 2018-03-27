import { Counters } from '~store/model';

export interface Event {
	counters: Counters;
	createdByUserId: string;
	creationDate: number;
	id: string;
	lastModifiedDate: number;
	lastUpdatedByUserId: string;
	name: string;
	teamId: string;
}
