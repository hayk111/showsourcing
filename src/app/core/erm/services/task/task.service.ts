import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { Task } from '~core/erm/models';
import { TaskQueries } from '~core/erm/services/task/task.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { GlobalWithAuditService } from '~core/erm/services/_global/global-with-audit.service';



@Injectable({
	providedIn: 'root'
})
export class TaskService extends GlobalWithAuditService<Task> {
	private _taskListUpdate$ = new Subject<void>();
	taskListUpdate$ = this._taskListUpdate$.asObservable();

	constructor(
		protected analyticsSrv: AnalyticsService,
		protected userSrv: UserService) {
		super(TaskQueries, 'task', 'tasks', userSrv, analyticsSrv);
	}

	onUpdateTaskList() {
		this._taskListUpdate$.next();
	}

	updateTask(updatedTask: { id: string, done: boolean }) {
		this.update(updatedTask).subscribe();
		this._taskListUpdate$.next();
	}

}
