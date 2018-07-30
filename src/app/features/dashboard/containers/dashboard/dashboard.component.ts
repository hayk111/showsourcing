import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap, first, takeUntil } from 'rxjs/operators';
import { ActivityService, GetStreamResult } from '~shared/activity/services/activity.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'dashboard-app',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	host: {
		class: 'flex'
	}
})
export class DashboardComponent extends AutoUnsub implements OnInit {
	feeds$: Observable<GetStreamResult[]>;
	private page$ = new BehaviorSubject(0);
	private page: number;
	constructor(private activitySrv: ActivityService) {
		super();
	}

	ngOnInit() {
		this.feeds$ = this.activitySrv.getDashboardActivity(this.page$);
		this.page$.pipe(
			takeUntil(this._destroy$)
		).subscribe(page => this.page = page)
	}

	loadMore() {
		this.page$.next(++this.page);
	}
}
