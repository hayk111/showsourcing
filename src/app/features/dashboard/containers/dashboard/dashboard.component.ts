import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardCounters, DashboardService } from '~features/dashboard/services/dashboard.service';
import { UserService } from '~entity-services';
import { Task, User, RPCRequest, RPCActionTypes, RPCRequestStatus } from '~models';
import { GroupedActivityFeed } from '~common/activity/interfaces/client-feed.interfaces';
import { ActivityService } from '~common/activity/services/activity.service';
import { RpcService } from '~core/entity-services/rpc/rpc.service';
import { uuid } from '~utils';

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
	data$: RPCRequest;

	constructor(
		private rpcRequestSrv: RpcService,
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
		this.rpcRequestSrv.createRPC({id: uuid(), action: RPCActionTypes.GET_TEAM_STATS, status: RPCRequestStatus.PENDING});
	}

	redirInviteTeam() {
		this.router.navigate(['settings/team/members']);
	}

	updateTask(task: Task) {
		this.dashboardSrv.updateTask(task);
	}
}

