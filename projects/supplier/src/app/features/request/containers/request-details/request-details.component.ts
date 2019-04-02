import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RequestReplyDlgComponent } from '~common/modals/component/request-reply-dlg/request-reply-dlg.component';
import { RequestElementService, SupplierRequestService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, RequestElement, SupplierRequest } from '~core/models';
import { DialogService } from '~shared/dialog';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'request-details-sup',
	templateUrl: './request-details.component.html',
	styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent extends AutoUnsub implements OnInit {

	request$: Observable<SupplierRequest>;
	private requestElements: RequestElement[];
	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private suppReqSrv: SupplierRequestService,
		private notifSrv: NotificationService,
		private reqElementSrv: RequestElementService,
		private dlgSrv: DialogService,
		public listSrv: ListPageService<RequestElement, RequestElementService>
	) { super(); }

	ngOnInit() {
		const id$ = this.route.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		);

		this.request$ = id$.pipe(
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
			switchMap(id => this.suppReqSrv.selectOne(id)),
			tap(req => this.requestElements = req.requestElements),
			takeUntil(this._destroy$)
		);

		this.request$.pipe(
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

	open(element: RequestElement) {
		const selectedIndex = this.requestElements.findIndex(elem => elem.id === element.id);
		const elements = this.requestElements;
		this.dlgSrv.open(RequestReplyDlgComponent, { elements, selectedIndex })
			.subscribe();
	}

	allReplied(reqElements: RequestElement[]) {
		let areReplied = false;
		if (reqElements)
			areReplied = !reqElements.some(element => element.reply.status !== 'replied');
		return areReplied;
	}

}
