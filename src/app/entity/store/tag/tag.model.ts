import { EntityTarget, Entity } from '~entity';


export class Tag extends Entity {
	itemType: string;
	lastModifiedDate: number;
	lastUpdatedByUserId: string;
	name: string;
	teamId: string;

	constructor(name: string, userId: string) {
		super(userId);
		this.name = name;
	}
}
