import { Entity } from './_entity.model';

export class Category extends Entity<Category> {
	lastUpdatedAt ?= Date.now();
	createdAt ?= Date.now();
	deleted ?= false;

	name?: string;
	teamId?: string;

	createdByUserId?: null;
	lastUpdatedByUserId?: string;
	id?: string;
	deletedBy?: undefined;
	deletionDate?: undefined;
	lastupdatedByUserId?: undefined;
	lastUpdatedBy?: undefined;
	_version?: undefined;
}
