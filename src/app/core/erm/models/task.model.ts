import { Comment, Product, Supplier, User } from '~core/erm/models';
import { EntityWithAudit } from '~core/erm/models/_entity.model';

import { ExtendedField } from './extended-field.model';

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
	comments?: Comment[];
	extendedFields?: ExtendedField[];
	lastUpdatedBy: User;
	reference?: string;
	archived = false;
	__typename?= 'Task';
}

export interface TaskConfig {
	name?: string;
	type?: any;
	done?: boolean;
	assignee?: User;
	product?: Product;
	supplier?: Supplier;
	comments?: Comment[];
	dueDate?: Date;
}
