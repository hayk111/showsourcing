import { Entity } from '~entity';

export class AppComment extends Entity {
	pending = true;
	constructor(public text: string, userId: string) {
		super(userId);
	}
}
