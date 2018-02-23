import { Counters } from '~store/model/entities/counters.interface';
import { uuid } from '~store';


export class Project {
	id: string;
	pending: boolean;
	name: string;
	createdByUserId: string;
	creationDate: number;
	description: string;
	teamId: string;

	constructor(id: string, name: string, pending: boolean = true) {
		this.id = uuid();
		this.name = name;
		this.pending = pending;
	}
}
