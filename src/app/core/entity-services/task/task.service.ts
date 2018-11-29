import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~entity-services/_global/global.service';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { UserService } from '~entity-services/user/user.service';
import { TaskQueries } from '~entity-services/task/task.queries';
import { Task } from '~models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class TaskService extends GlobalWithAuditService<Task> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, TaskQueries, 'task', 'tasks', userSrv);
	}

}
