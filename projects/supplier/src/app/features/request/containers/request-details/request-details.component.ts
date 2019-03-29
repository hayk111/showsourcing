import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RequestElementService, SupplierRequestService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, RequestElement } from '~core/models';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils';
import { Client } from '~core/apollo/services/apollo-client-names.const';

@Component({
	selector: 'request-details-sup',
	templateUrl: './request-details.component.html',
	styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent extends AutoUnsub implements OnInit {

	request: Request;
	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private suppReqSrv: SupplierRequestService,
		private notifSrv: NotificationService,
		private cdr: ChangeDetectorRef,
		private reqElementSrv: RequestElementService,
		public listSrv: ListPageService<RequestElement, RequestElementService>
	) { super(); }

	ngOnInit() {
		const id$ = this.route.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		);

		id$.pipe(
			tap(id => {
				this.listSrv.setup({
					key: `${ListPageKey.REQUEST_ELEMENT}-${id}`,
					entitySrv: this.reqElementSrv,
					selectParams: { sortBy: 'name' },
					searchedFields: [],
					entityMetadata: ERM.REQUEST_ELEMENT,
					initialFilters: []
				});
			}),
			switchMap(id => this.suppReqSrv.selectOne(id)),
			takeUntil(this._destroy$)
		).subscribe(
			request => this.onRequest(request),
			err => this.onError(err)
		);
	}

	private onRequest(request) {
		if (!request) {
			this.notifSrv.add({
				type: NotificationType.ERROR,
				title: 'The request doesn\'t exist',
				timeout: 3500
			});
			this.router.navigate(['request']);
		} else {
			this.request = request;
			this.cdr.detectChanges();
		}
	}

	private onError(error) {
		this.notifSrv.add({
			type: NotificationType.ERROR,
			title: 'Error',
			message: 'There is an error, please try again later',
			timeout: 3500
		});
		this.router.navigate(['request']);
	}

}
