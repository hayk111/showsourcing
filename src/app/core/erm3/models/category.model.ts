import { Entity } from './_entity.model';
import { Lang } from '../../../API.service';
import { Team } from './team.model';
import { User } from './user.model';

export class Category extends Entity<Category> {
	__typename? = 'Category';
	id?: string;
	teamId?: string;
	team?: Team;
	name?: string;
	createdAt?: number;
	createdByUserId?: string;
	createdBy?: User;
	deletedByUserId?: string;
	deletedBy?: User;
	deletedAt?: number | null;
	lastUpdatedByUserId?: string;
	lastUpdatedBy?: User;
	lastUpdatedAt?: number;
	deleted?: boolean;
	_version?: number;
	_deleted?: boolean | null;
	_lastChangedAt?: number;
}
