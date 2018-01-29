import { EntityTarget } from '../../utils/entities.utils';
import { AsyncEntityWithTarget } from './async-entity.model';
import { Store } from '@ngrx/store';
import { selectUserTeamId } from '../../selectors/entities/user.selector';
import { take } from 'rxjs/operators';


export class AppComment extends AsyncEntityWithTarget {
	entityCounter?: number;
	lastModifiedDate?: number;
	lastUpdatedByUserId?: string;
	linkedToParent?: boolean;
	modificationCounterText?: number;
	teamId?: string;

	constructor(public text: string, target: EntityTarget, store: Store<any>) {
		super(target, store);
		this.creationDate = Date.now();
		store.select(selectUserTeamId).pipe(take(1))
			.subscribe(id => this.teamId = id);
	}
}
