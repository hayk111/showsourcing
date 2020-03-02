import { Entity } from './_entity.model';

export class Category extends Entity<Category> {
	lastUpdatedDate ?= Date.now();
	creationDate ?= Date.now();
	deleted ?= false;
	constructor(config?: Category) {
		super(config);
	}
	name?: string;
	// lastUpdatedDate?: number;
	// creationDate?: number;
	teamId?: string;
	// deleted?: boolean;

	createdByUserId?: null;
	lastUpdatedByUserId?: string;
	id?: string;
	deletedBy?: undefined;
	deletionDate?: undefined;
	lastupdatedByUserId?: undefined;
	lastUpdatedBy?: undefined;
	_version?: undefined;
}
