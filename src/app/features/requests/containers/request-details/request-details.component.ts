import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { RequestElementService, RequestService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, Request, RequestElement } from '~core/models';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'request-details-app',
	templateUrl: './request-details.component.html',
	styleUrls: ['./request-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestDetailsComponent extends AutoUnsub implements OnInit {

	request: Request;
	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private featureSrv: RequestService,
		private notifSrv: NotificationService,
		private cdr: ChangeDetectorRef,
		private reqElementSrv: RequestElementService,
		public commonModalSrv: CommonModalService,
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
					selectParams: { sortBy: 'name', query: `@links.Request.requestElements.id == "${id}"` },
					searchedFields: [],
					entityMetadata: ERM.REQUEST_ELEMENT,
					initialFilters: []
				});
			}),
			switchMap(id => this.featureSrv.selectOne(id)),
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
