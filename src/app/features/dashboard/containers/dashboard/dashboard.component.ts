import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivityService, GetStreamResult } from '~shared/activity/services/activity.service';
import { AutoUnsub } from '~utils';

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
	private _selectParams$ = new BehaviorSubject<Observable<GetStreamResult[]>>(of([]));
	private selectParams$ = this._selectParams$.asObservable().pipe(
		switchMap(feed$ => feed$)
	);

	constructor(private activitySrv: ActivityService) {
		super();
	}

	ngOnInit() {
		this.feeds$ = this.activitySrv.getDashboardActivity(this.selectParams$);
	}

	loadMore() {
		this._selectParams$.next(this.feeds$);
	}
}
