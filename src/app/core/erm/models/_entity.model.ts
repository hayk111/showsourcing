import { ID, uuid } from '~utils';
import { User } from '~core/erm/models/user.model';
import { UserService } from '~core/erm/services/user/user.service';

export interface Entity {
	id?: ID;
	__typename?: string;
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

