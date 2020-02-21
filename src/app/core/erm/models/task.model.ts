import { Comment, Product, Supplier, User } from '~core/erm/models';
import { Entity } from '~core/erm/models/_entity.model';
import { ExtendedField } from './extended-field.model';


export class Task extends Entity<Task> {
	description?: string;
	name?: string;
	type?: any;
	code?: string;
	done ?= false;
	dueDate?: Date;
	completionDate?: Date;
	assignee?: User;
	product?: Product;
	supplier?: Supplier;
	comments?: Comment[];
	extendedFields?: ExtendedField[];
	lastUpdatedBy?: User;
	reference?: string;
	archived ?= false;
	__typename ?= 'Task';
}

