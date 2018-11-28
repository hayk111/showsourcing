import { EntityWithAudit } from '~models/_entity.model';
import { User, Product, Supplier } from '~models';

export class Task extends EntityWithAudit<TaskConfig> {
	description?: string;
	name?: string;
	type?: any;
	code?: string;
	done = false;
	dueDate?: Date;
	completionDate?: Date;
	assignee?: User;
	product?: Product;
	supplier?: Supplier;
	__typename ?= 'Task';
}

export interface TaskConfig {
	name?: string;
	type?: any;
	done?: boolean;
	assignee?: User;
	product?: Product;
	supplier?: Supplier;
}
