import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardCounters, DashboardService } from '~features/dashboard/services/dashboard.service';
import { UserService } from '~entity-services';
import { Task, User } from '~models';
import { GroupedActivityFeed } from '~common/activity/interfaces/client-feed.interfaces';
import { ActivityService } from '~common/activity/services/activity.service';

// Boy complains to his father: You told me to put a potato in my swimming trunks! You said it would
// impress the girls at the pool! But you forgot to mention one thing!
// Father: Really, what?
// Boy: That the potato should go in the front.

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

