import { uuid } from '~utils';
import { User } from '~models/user.model';
import { ID } from '~utils/id.utils';

export interface Entity {
	id?: ID;
}

export class EntityWithAudit<G> implements Entity {
	id?: string;
	creationDate?: string;
	lastUpdatedDate?: string;
	createdBy?: User;
	deleted?: boolean;

	constructor(config?: G) {
		this.id = uuid();
		this.creationDate = '' + new Date();
		this.lastUpdatedDate = '' + new Date();
		this.deleted = false;
		Object.assign(this, config);
	}
}


