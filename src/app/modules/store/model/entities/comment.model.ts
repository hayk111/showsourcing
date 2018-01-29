import { Entity } from '../../utils/entities.utils';

export class AppComment extends Entity {

	constructor(public text: string, userId: string) {
		super(userId);
	}
}
