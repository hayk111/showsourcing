import { EntityWithAudit } from '~models/_entity.model';

export class Task extends EntityWithAudit<TaskConfig> {
	__typename ?= 'Task';

}

export interface TaskConfig {

}
