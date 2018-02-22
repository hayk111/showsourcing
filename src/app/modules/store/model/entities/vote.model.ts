import { Entity } from '../../utils/entities.utils';

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
