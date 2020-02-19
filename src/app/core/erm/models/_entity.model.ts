import { ID, uuid } from '~utils';
import { User } from '~core/erm/models/user.model';
import { UserService } from '~core/erm/services/user/user.service';


export class Entity<G> {
	id: string = uuid();

	_deleted?: boolean = null;
	_lastChangedAt?: string = '' + new Date();
	_version?: number;

	constructor(config?: G) {
		Object.assign(this, config);
	}
}



