import { ID, uuid } from '~utils';
import { User } from '~models/user.model';
import { UserService } from '~core/entity-services';

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
		this.createdBy = UserService.userSync;
		Object.assign(this, config);
	}
}


