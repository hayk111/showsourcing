import { Entity } from '~core/erm/models/_entity.model';
import { User } from './user.model';

export class Category extends Entity<Category> {
	__typename ?= 'Category';
	teamId?: string;
	name?: string;
	createdAt?: string;
	deletionDate?: number;
	lastUpdatedBy?: User;
	lastUpdatedDate?: number;
}
