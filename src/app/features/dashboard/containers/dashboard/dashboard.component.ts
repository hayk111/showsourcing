import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap, first, takeUntil } from 'rxjs/operators';
import { ActivityService, GetStreamResult } from '~shared/activity/services/activity.service';
import { AutoUnsub } from '~utils';
import { TemplateService } from '~shared/template/services/template.service';
import { TeamService } from '~global-services';
import { map } from 'rxjs/internal/operators/map';
import { filter } from 'graphql-anywhere';

@Component({
	selector: 'dashboard-app',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	host: {
		class: 'flex'
	}
})
export class DashboardComponent implements OnInit {
	feed$: Observable<any>;

	constructor(private activitySrv: ActivityService) {

	}

	ngOnInit() {
		this.feed$ = this.activitySrv.getDashboardFeed(of(0));
	}
}

