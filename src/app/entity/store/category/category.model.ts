
import { Entity } from '~entity/store/entity.model';

export class Category extends Entity {
	name: string;
	teamId: string;
	constructor(name: string, userId: string) {
		super(userId);
		this.name = name;
	}
}


