import { Injectable } from '@angular/core';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~core/erm/services/_global/global-with-audit.service';
import { TaskQueries } from '~core/erm/services/task/task.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { Task } from '~core/erm/models';
import { Subject, Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class TaskService extends GlobalWithAuditService<Task> {
	private _taskListUpdate$ = new Subject<void>();
	taskListUpdate$ = this._taskListUpdate$.asObservable();

	constructor(
		protected analyticsSrv: AnalyticsService,
		protected apolloState: ApolloStateService,
		protected userSrv: UserService) {
		super(apolloState, TaskQueries, 'task', 'tasks', userSrv, analyticsSrv);
	}

	onUpdateTaskList() {
		this._taskListUpdate$.next();
	}

	updateTask(updatedTask: { id: string, done: boolean }) {
		this.update(updatedTask).subscribe();
		this._taskListUpdate$.next();
	}

}
