import { Entity } from './_entity.model';
import { TeamInput, UserInput, ProductInput, SupplierInput } from '../../../API.service';

export class Task extends Entity<Task> {
	lastUpdatedAt? = Date.now();
	createdAt? = Date.now();
	deleted? = false;

	createdByUserId?: string | null;
	lastUpdatedByUserId?: string | null;
	id?: string;
	teamId?: string | null;
	team?: TeamInput | null;
	name?: string | null;
	description?: string | null;
	dueDate?: number | null;
	completed?: boolean | null;
	completionDate?: number | null;
	assigneeUserId?: string | null;
	assignee?: UserInput | null;
	product?: ProductInput | null;
	supplier?: SupplierInput | null;
	reference?: string | null;
	referenceKey?: number | null;
	inProgress?: boolean | null;
	deletedByUSerId?: string | null;
	deletionDate?: number | null;
	_version?: number | null;
	taskProductId?: string | null;
	taskSupplierId?: string | null;
}
