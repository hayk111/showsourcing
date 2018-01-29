import { EntityTarget, Entity } from '../../utils/entities.utils';


export class Tag extends Entity {
	entityCounter: number;
	itemType: string;
	lastModifiedDate: number;
	lastUpdatedByUserId: string;
	locked: boolean;
	modificationCounterLocked: number;
	modificationCounterName: number;
	name: string;
	teamId: string;

	constructor(name: string, userId: string) {
		super(userId);
		this.name = name;
	}
}
