import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardCounters } from '~features/dashboard/services/dashboard.service';
import { Task } from '~models';
import { User } from '~models/user.model';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
	selector: 'dashboard-summary-app',
	templateUrl: './summary.component.html',
	styleUrls: ['./summary.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent extends TrackingComponent {
	@Input() user: User;
	@Input() counters: DashboardCounters;
	@Input() tasks: Task[] = [];
	@Output() updateTask = new EventEmitter<Task>();
	// this is use to update the count on the front end
	index = 0;

	constructor(private router: Router) {
		super();
	}

	goToWorkspace() {
		this.router.navigate(['workspace', 'my-tasks']);
	}

	get taskScore() {
		return this.counters ? ((this.counters.tasksDone + this.index) / this.counters.totalTasks) * 100 : 0;
	}

	toggleDoneStatus(task: Task) {
		const done = !task.done;
		this.index = done ? this.index + 1 : this.index - 1;
		this.updateTask.emit({ ...task, done });
	}
}
