import { uuid } from '~utils';
import { User } from '~models/user.model';

export interface Entity {
	id?: string;
	name?: string;
}

export class BaseEntity<G> implements Entity {
	id?: string;
	creationDate?: string;
	lastUpdatedDate?: string;
	createdBy?: User;
	deleted?: boolean;

	constructor(config: G) {
		Object.assign(this, config);
		this.id = uuid();
		this.creationDate = '' + new Date();
		this.lastUpdatedDate = '' + new Date();
		this.deleted = false;
	}
}


