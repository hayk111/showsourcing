import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RequestReplyDlgComponent } from '~common/modals/component/request-reply-dlg/request-reply-dlg.component';
import { RequestElementService, RequestReplyService, SupplierRequestService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { DEFAULT_REPLIED_STATUS, ERM, RequestElement, SupplierRequest } from '~core/models';
import { DialogService } from '~shared/dialog';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub, ID } from '~utils';
import { RefuseReplyDlgComponent } from '~common/modals';

@Component({
	selector: 'request-details-sup',
	templateUrl: './request-details.component.html',
	styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent extends AutoUnsub implements OnInit {

	private requestElements: RequestElement[];
	request$: Observable<SupplierRequest>;
	request: SupplierRequest;
	requestId: string;
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
			tap(id => this.requestId = id),
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
					initialFilters: [],
					originComponentDestroy$: this._destroy$
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
		} else
			this.request = request;
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
		this.dlgSrv.open(RequestReplyDlgComponent, { selectedIndex, requestId: this.requestId });
	}

	allReplied(reqElements: RequestElement[]) {
		let allReplied = false;
		if (reqElements)
			allReplied = !reqElements.some(element => element.reply.status !== DEFAULT_REPLIED_STATUS);
		return allReplied;
	}

	openRefuseReplyDlg(replyId: ID) {
		this.dlgSrv.open(RefuseReplyDlgComponent, {
			senderName: this.request.sender.name,
			recipientName: this.request.recipient.name,
			replyId
		});
	}

}
