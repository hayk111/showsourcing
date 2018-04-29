import { Entity } from '~app/entity/store/entity.model';

export class AppComment extends Entity {
	pending = true;
	constructor(public text: string, userId: string) {
		super(userId);
	}
}
