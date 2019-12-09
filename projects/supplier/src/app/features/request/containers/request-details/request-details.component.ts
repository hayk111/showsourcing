import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RefuseReplyDlgComponent, RequestReplyDlgComponent } from '~common/dialogs/services/dialog-common.service';
import { RequestElementService, SupplierRequestService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { DEFAULT_REPLIED_STATUS, ERM, RequestElement, SupplierRequest } from '~core/models';
import { DialogService } from '~shared/dialog';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub, ID, translate } from '~utils';

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
					entitySrv: this.reqElementSrv,
					// when we send the index to the dialog, we have to take care of how we sort
					// since the elements on the dialog are not queries by @links.Request.requestElements.id but by request.requestElements
					// we sort on the dialog manually request.requestElements.sort(name)
					selectParams: { sortBy: 'id', query: `@links.Request.requestElements.id == "${id}"`, descending: false },
					searchedFields: [],
					entityMetadata: ERM.REQUEST_ELEMENT,
					initialFilters: [],
					originComponentDestroy$: this._destroy$
				});
			}),
			switchMap(id => this.listSrv.items$, (id, items) => [id, items]),
			tap(([id, items]) => this.requestElements = items ? items : []),
			switchMap(([id, items]) => this.suppReqSrv.selectOne(id)),
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
				title: translate('The request doesn\'t exist'),
				timeout: 3500
			});
			this.router.navigate(['requests']);
		} else
			this.request = request;
	}

	private onError(error) {
		this.notifSrv.add({
			type: NotificationType.ERROR,
			title: translate('error'),
			message: translate('There is an error, please try again later'),
			timeout: 3500
		});
		this.router.navigate(['requests']);
	}

	open(element: RequestElement) {
		const selectedIndex = this.requestElements.findIndex(elem => elem.id === element.id);
		this.dlgSrv.open(RequestReplyDlgComponent, {
			selectedIndex,
			requestId: this.requestId
		});
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
