import { Typename } from '../typename.type';
import { Entity } from './_entity.model';
import { WorkflowType } from '../interfaces/workflow-type.inteface';

export class WorkflowStatus extends Entity<WorkflowStatus> {
	__typename?: Typename = 'WorkflowStatus';
	id?: string;
	name?: string;
	inWorkflow?: boolean;
	category?: string;
	step?: number;
	final?: boolean;
	type?: WorkflowType;
}
