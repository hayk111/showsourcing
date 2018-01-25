import { EntityTarget } from '../utils/entities.utils';
import { Store } from '@ngrx/store';
import { selectUser } from '../selectors/user.selector';
import { take, map } from 'rxjs/operators';
import { uuid } from '../utils/uuid.utils';
import { User } from './user.model';



export class AsyncEntityWithTarget {
	id: string;
	pending = true;
	createdByUserId: string;
	creationDate: number;

	constructor(userId: string) {
		this.id = uuid();
		this.pending = true;
		this.creationDate = Date.now();
		this.createdByUserId = userId;
	}

}
