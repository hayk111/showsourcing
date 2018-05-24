import { Audit } from './audit.model';
import { uuid } from '~utils';
import { User } from '~models/user.model';

export interface Entity {
	id?: string;
	name?: string;
}

export class BaseEntity<G> implements Entity {
	id?: string;
	creationDate?: string;
	createdBy?: User;

	constructor(config: G) {
		this.id = uuid();
		this.creationDate = '' + new Date();
	}
}


