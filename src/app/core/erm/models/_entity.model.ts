import { ID, uuid } from '~utils';
import { User } from '~core/erm/models/user.model';
import { UserService } from '~core/erm/services/user/user.service';


export class Entity<G> {
	__typename ?: string;
	id?: string = uuid();
	_creationDate?: string = '' + new Date();
	_lastUpdatedDate?: string = '' + new Date();
	_createdBy?: User = UserService.userSync;
	_deleted?: boolean = null;
	_deletionDate?: boolean;
	archived?: boolean;

	constructor(config?: G) {
		Object.assign(this, config);
	}
}



