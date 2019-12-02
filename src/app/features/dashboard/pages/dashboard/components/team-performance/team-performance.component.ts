import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';
import { RPCActionTypes, RPCRequestStatus } from '~models';
import { RpcService } from '~core/entity-services';
import { ChartDataSets } from 'chart.js';
import { Observable, of, TimeoutError } from 'rxjs';
import { map, first, tap, catchError } from 'rxjs/operators';

@Component({
	selector: 'team-performance-app',
	templateUrl: './team-performance.component.html',
	styleUrls: ['./team-performance.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamPerformanceComponent extends TrackingComponent implements OnInit {

	teamStats$: Observable<any>;
	lineChartData: Array<ChartDataSets> = [];
	status = 'pending';

	totalProducts = 0;
	totalSuppliers = 0;
	productsThisWeek = 0;
	suppliersThisWeek = 0;

	requestTimedOut = false;

	@Output() inviteTeam = new EventEmitter<null>();

	constructor(
		private rpcSrv: RpcService,
		private cdr: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit() {
		this.teamStats$ = this.rpcSrv.createRPC({
			action: RPCActionTypes.GET_TEAM_STATS,
		}).pipe(
				catchError(err => {
					if (err instanceof TimeoutError) {
						this.requestTimedOut = true;
						this.cdr.detectChanges();
					}

					return of();
				}),
				first(),
				map((data: any) => JSON.parse(JSON.parse(data.reply))),
				tap((teamStats: any) => {
					this.totalProducts = teamStats.products.total;
					this.productsThisWeek = teamStats.products.week0;
					this.totalSuppliers = teamStats.suppliers.total;
					this.suppliersThisWeek = teamStats.suppliers.week0;
				}),
				map((data: any) => {
				const items = [];
				const teamStats = data;

				for (const key of Object.keys(teamStats)) {
					const item: any = {};
					item.label = key;
					item.data = [];

					for (const dataKey of Object.keys(teamStats[key])) {
						if (dataKey.startsWith('week')) {
							item.data.push(teamStats[key][dataKey]);
						}
					}

					item.data.reverse();
					items.push(item);
				}

				return items;
			}));
	}

}
