import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from '~global-services';
import { Product } from '~models';
import { Router } from '@angular/router';
import { ActivityService, GetStreamResult } from '~shared/activity/services/activity.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'dashboard-app',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex flexCenter flexColumn'
	}
})
export class DashboardComponent implements OnInit {
	feeds$: Observable<GetStreamResult[]>;

	constructor(
		private productSrv: ProductService,
		private activitySrv: ActivityService,
		private router: Router
	) { }

	ngOnInit() {
		this.feeds$ = this.activitySrv.getDashboardActivity();
	}

}
