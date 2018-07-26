import { Component, OnInit, ChangeDetectionStrategy, NgModuleRef } from '@angular/core';
import { ProductService } from '~global-services';
import { Product } from '~models';
import { Router } from '@angular/router';
import { ActivityService, GetStreamResult, GetStreamResponse } from '~shared/activity/services/activity.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AutoUnsub } from '~utils';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';

@Component({
	selector: 'dashboard-app',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	host: {
		class: 'flex flexCenter flexColumn'
	}
})
export class DashboardComponent extends AutoUnsub implements OnInit {
	feeds$: Observable<GetStreamResult[]>;
	page$ = new BehaviorSubject<number>(0);
	page;

	constructor(
		private productSrv: ProductService,
		private activitySrv: ActivityService,
		private router: Router
	) {
		super();
	}

	ngOnInit() {
		this.page$.pipe(takeUntil(this._destroy$)).subscribe(p => this.page = p);
		this.feeds$ = this.activitySrv.getDashboardActivity(this.page$);
	}

	loadMore() {
		debugger;
		this.page$.next(++this.page);
	}
}
