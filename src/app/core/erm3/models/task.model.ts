import { EntityName } from '../entity-name.type';
import { Product } from './product.model';
import { Supplier } from './supplier.model';
import { Team } from './team.model';
import { User } from './user.model';
import { Entity } from './_entity.model';

export class Task extends Entity<Task> {
	__typename?: EntityName = 'Task';
	id?: string;
	teamId?: string;
	team?: Team;
	name?: string | null;
	description?: string | null;
	dueDate?: number | null;
	completed?: boolean | null;
	completionDate?: number | null;
	assigneeUserId?: string;
	assignee?: User;
	product?: Product;
	supplier?: Supplier;
	reference?: string | null;
	referenceKey?: number | null;
	inProgress?: boolean | null;
	createdAt?: number;
	createdByUserId?: string;
	deletedByUSerId?: string | null;
	deletedAt?: number | null;
	lastUpdatedByUserId?: string;
	lastUpdatedAt?: number;
	deleted?: boolean;
	_version?: number;
	_deleted?: boolean | null;
	_lastChangedAt?: number;
}
