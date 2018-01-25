
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import { User } from './user.model';
import { uuid } from '../../utils/uuid.utils';



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
