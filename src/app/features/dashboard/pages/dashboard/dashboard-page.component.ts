import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardCounters, DashboardService } from '~features/dashboard/services/dashboard.service';
import { UserService, ProductService } from '~core/orm/services';
import { StatusSelectorService } from '~shared/status-selector/service/status-selector.service';
import { Task, User, Product } from '~core/orm/models';
import { GroupedActivityFeed } from '~common/activity/interfaces/client-feed.interfaces';
import { ActivityService } from '~common/activity/services/activity.service';
import { AutoUnsub } from '~utils';

// Boy complains to his father: You told me to put a potato in my swimming trunks! You said it would
// impress the girls at the pool! But you forgot to mention one thing!
// Father: Really, what?
// Boy: That the potato should go in the front.

@Component({
	selector: 'dashboard-page-app',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss'],
	host: {
		class: 'flex'
	}
})
export class DashboardPageComponent extends AutoUnsub implements OnInit {
	feedResult: GroupedActivityFeed;
	user$: Observable<User>;
	counters$: Observable<DashboardCounters>;
	tasks$: Observable<Task[]>;
	latestProducts$: Observable<Product[]>;
	yourProducts$: Observable<Product[]>;

	constructor(
		private router: Router,
		private activitySrv: ActivityService,
		private dashboardSrv: DashboardService,
		private productSrv: ProductService,
		private userSrv: UserService,
		private statusSrv: StatusSelectorService,
	) {
		super();
	}

	ngOnInit() {
		this.feedResult = this.activitySrv.getDashboardFeed();
		this.user$ = this.userSrv.selectUser();
		this.counters$ = this.dashboardSrv.getCounters();
		this.tasks$ = this.dashboardSrv.getFirstFewTasks();

		const selectParamsLatest = {
			descending: true,
			take: 10,
			skip: 0,
		};

		const queryLatest = this.productSrv.getListQuery(selectParamsLatest);
		this.latestProducts$ = queryLatest.items$;
		this.yourProducts$ = this.dashboardSrv.getFirstFewProducts();
		queryLatest.items$.connect();

		this.productSrv.productListUpdate$.pipe(
		).subscribe(_ => {
			this.yourProducts$ = this.dashboardSrv.getFirstFewProducts();
		});

		this.statusSrv.statusUpdate$
			.pipe(takeUntil(this._destroy$))
			.subscribe(_ => {
			this.yourProducts$ = this.dashboardSrv.getFirstFewProducts();
		});
	}

	redirInviteTeam() {
		this.router.navigate(['settings/team/members']);
	}

	updateTask(task: Task) {
		this.dashboardSrv.updateTask(task);
	}
}

