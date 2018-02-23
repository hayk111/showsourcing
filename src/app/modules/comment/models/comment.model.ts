import { Entity } from '../../store/utils/entities.utils';

export class AppComment extends Entity {
	pending = true;
	constructor(public text: string, userId: string) {
		super(userId);
	}
}
