import { EntityTarget } from '../../utils/entities.utils';
import { AsyncEntityWithTarget } from './async-entity.model';
import { Store } from '@ngrx/store';

export class Vote extends AsyncEntityWithTarget {
	value: number;
	userId: string;
	// at the moment it seems like votes are only for product in the backend
	productId?: string;

	constructor(value: number, target: EntityTarget, store: Store<any>) {
		super(target, store);
		this.value = value;
		this.userId = this.createdByUserId;
	}
}
