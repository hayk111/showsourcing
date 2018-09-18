import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap, first, takeUntil } from 'rxjs/operators';
import { ActivityService } from '~shared/activity/services/activity.service';
import { AutoUnsub } from '~utils';
import { TemplateService } from '~shared/template/services/template.service';
import { TeamService, UserService } from '~global-services';
import { map } from 'rxjs/internal/operators/map';
import { filter } from 'graphql-anywhere';
import { GroupedActivityFeed } from '~shared/activity/interfaces/client-feed.interfaces';
import { DashboardService, DashboardCounters } from '~features/dashboard/services/dashboard.service';
import { User, Task, ERM, Price } from '~models';
import { Router } from '@angular/router';

@Component({
	selector: 'dashboard-app',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	host: {
		class: 'flex'
	}
})
export class DashboardComponent implements OnInit {
	feedResult: GroupedActivityFeed;
	user$: Observable<User>;
	counters$: Observable<DashboardCounters>;
	tasks$: Observable<Task[]>;

	constructor(
		private router: Router,
		private activitySrv: ActivityService,
		private dashboardSrv: DashboardService,
		private userSrv: UserService
	) { }

	ngOnInit() {
		this.feedResult = this.activitySrv.getDashboardFeed();
		this.user$ = this.userSrv.selectUser();
		this.counters$ = this.dashboardSrv.getCounters();
		this.tasks$ = this.dashboardSrv.getFirstFewTasks();
	}

	redirInviteTeam() {
		this.router.navigate(['settings/team/members']);
	}

	updateTask(task: Task) {
		this.dashboardSrv.updateTask(task);
	}
}

