import { Typename } from '../typename.type';
import { Product } from './product.model';
import { Supplier } from './supplier.model';
import { Team } from './team.model';
import { User } from './user.model';
import { Entity } from './_entity.model';

export class Task extends Entity<Task> {
	__typename?: Typename = 'Task';
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
	properties?: any;
	status?: any;
}
