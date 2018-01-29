import { AsyncEntityWithTarget } from './async-entity.model';
import { EntityTarget } from '../../utils/entities.utils';
import { Store } from '@ngrx/store';


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

	constructor(name: string, target: EntityTarget, store: Store<any>) {
		super(target, store);
		this.name = name;
	}
}
