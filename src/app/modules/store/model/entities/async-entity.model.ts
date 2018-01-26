import { EntityTarget } from '../../utils/entities.utils';
import { Store } from '@ngrx/store';
import { selectUser } from '../../selectors/entities/user.selector';
import { take, map } from 'rxjs/operators';
import { uuid } from '../../utils/uuid.utils';
import { User } from './user.model';



export class AsyncEntityWithTarget {
	id: string;
	pending = true;
	target: EntityTarget;
	createdByUserId: string;
	creationDate: number;

	constructor(target: EntityTarget, store: Store<any>) {
		this.id = uuid();
		this.target = target;
		this.pending = true;
		this.creationDate = Date.now();
		AsyncEntityWithTarget.selectUserId(store)
			.subscribe(id => this.createdByUserId = id);
	}

	private static selectUserId(store) {
		return store.select(selectUser).pipe(
			take(1),
			map((user: User) => user.id)
		);
	}

}
