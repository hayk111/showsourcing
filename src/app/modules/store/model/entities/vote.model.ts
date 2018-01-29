import { EntityTarget, Entity } from '../../utils/entities.utils';
import { Store } from '@ngrx/store';

export class Vote extends Entity {
	value: number;
	userId: string;
	// at the moment it seems like votes are only for product in the backend
	productId?: string;

	constructor(value: number, userId: string) {
		super(userId);
		this.value = value;
	}
}
