import { Counters } from './counters.interface';
import { uuid } from '../utils/uuid.utils';


export class Project {
	id: string;
	pending: boolean;
	name: string;
	counters: Counters;
	createdByUserId: string;
	creationDate: number;
	description: string;
	lastModifiedDate: number;
	lastUpdatedByUserId: string;
	locked: boolean;
	teamId: string;

	constructor(id: string, name: string, pending: boolean = true) {
		this.id = uuid();
		this.name = name;
		this.pending = pending;
	}
}
