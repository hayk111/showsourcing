import { Counters } from './counters.interface';


export interface Project {
	counters: Counters;
	createdByUserId: string;
	creationDate: number;
	description: string;
	id: string;
	lastModifiedDate: number;
	lastUpdatedByUserId: string;
	locked: boolean;
	name: string;
	teamId: string;
}
