import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services/user/user.service';
import { TaskQueries } from '~global-services/task/task.queries';
import { Task } from '~models';


@Injectable({
	providedIn: 'root'
})
export class TaskService extends GlobalWithAuditService<Task> {

	constructor(apollo: Apollo, protected userSrv: UserService) {
		super(apollo, TaskQueries, 'task', 'tasks', userSrv);
	}

}
