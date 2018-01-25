import { AsyncEntityWithTarget } from './async-entity.model';
import { Store } from '@ngrx/store';
import { EntityTarget } from '../../utils/entities.utils';


export class Tag extends AsyncEntityWithTarget {
	entityCounter: number;
	itemType: string;
	lastModifiedDate: number;
	lastUpdatedByUserId: string;
	locked: boolean;
	modificationCounterLocked: number;
	modificationCounterName: number;
	name: string;
	teamId: string;

	constructor(name: string, target: EntityTarget, userId: string) {
		super(userId);
		this.name = name;
	}
}
