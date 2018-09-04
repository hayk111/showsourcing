import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '~global-services';
import { User } from '~models/user.model';
import { Observable } from 'rxjs';
import { Input } from '@angular/core';
import { Task } from '~models';
import { DashboardCounters } from '~features/dashboard/services/dashboard.service';

@Component({
	selector: 'dashboard-summary-app',
	templateUrl: './summary.component.html',
	styleUrls: ['./summary.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent {
	@Input() user: User;
	@Input() counters: DashboardCounters;
	@Input() tasks: Task[] = [];
	constructor(private userSrv: UserService) { }
	get taskScore() { return this.counters ? (this.counters.tasksInProgress / this.counters.totalTasks) : 0; }
}
