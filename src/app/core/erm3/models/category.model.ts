export class Category {
	constructor(name: string, ) {
		this.lastUpdatedDate = Date.now();
		this.creationDate = Date.now();
		this.deleted = false;
	}

	name: string;
	lastUpdatedDate: number;
	creationDate: number;
	teamId: string;
	deleted: boolean;

	createdByUserId: null;
	lastUpdatedByUserId: string;
	id?: string;
	deletedBy?: undefined;
	deletionDate?: undefined;
	lastupdatedByUserId?: undefined;
	lastUpdatedBy?: undefined;
	_version?: undefined;
}
