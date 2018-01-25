import { EntityTarget } from '../utils/entities.utils';
import { AsyncEntityWithTarget } from './async-entity.model';
import { Store } from '@ngrx/store';
import { selectUserTeamId } from '../selectors/user.selector';
import { take } from 'rxjs/operators';
import { User } from './user.model';


export class AppComment extends AsyncEntityWithTarget {
	entityCounter?: number;
	lastModifiedDate?: number;
	lastUpdatedByUserId?: string;
	linkedToParent?: boolean;
	modificationCounterText?: number;
	teamId?: string;

	constructor(public text: string, user: User) {
		super(user.id);
		this.creationDate = Date.now();
		this.teamId = user.currentTeamId;
	}
}
