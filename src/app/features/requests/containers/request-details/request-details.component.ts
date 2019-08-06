import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CommonModalService, RefuseReplyDlgComponent } from '~common/modals';
import {
	ReviewRequestReplyDlgComponent,
} from '~common/modals/component/review-request-reply-dlg/review-request-reply-dlg.component';
import { RequestElementService, RequestReplyService, SupplierRequestService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, ReplyStatus, RequestElement, SupplierRequest } from '~core/models';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub, ID, translate } from '~utils';

@Component({
	selector: 'request-details-app',
	templateUrl: './request-details.component.html',
	styleUrls: ['./request-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestDetailsComponent extends AutoUnsub implements OnInit {

	private requestElements: RequestElement[];
	request: SupplierRequest;
	requestId: string;
	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private suppReqSrv: SupplierRequestService,
		private notifSrv: NotificationService,
		private requestReplySrv: RequestReplyService,
		private cdr: ChangeDetectorRef,
		private reqElementSrv: RequestElementService,
		public commonModalSrv: CommonModalService,
		public listSrv: ListPageService<RequestElement, RequestElementService>,
		private dlgSrv: DialogService
	) { super(); }

	ngOnInit() {
		const id$ = this.route.params.pipe(
			map(params => params.id),
			tap(id => this.requestId = id),
			takeUntil(this._destroy$)
		);

		id$.pipe(
			tap(id => {
				this.listSrv.setup({
					key: `${ListPageKey.REQUEST_ELEMENT}-${id}`,
					entitySrv: this.reqElementSrv,
					selectParams: { sortBy: 'name', query: `@links.Request.requestElements.id == "${id}"`, descending: false },
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
			this.router.navigate(['request']);
		} else {
			this.request = request;
			this.cdr.detectChanges();
		}
	}

	private onError(error) {
		this.notifSrv.add({
			type: NotificationType.ERROR,
			title: translate('error'),
			message: translate('There is an error, please try again later'),
			timeout: 3500
		});
		this.router.navigate(['request']);
	}

	openReviewRequestReply(id: string) {
		const selectedIndex = this.requestElements.findIndex(elem => elem.id === id);
		this.dlgSrv.open(ReviewRequestReplyDlgComponent, {
			elementId: id,
			elements: this.requestElements,
			selectedIndex,
			requestId: this.requestId
		});
	}

	openRefuseReplyDlg(replyId: ID) {
		this.dlgSrv.open(RefuseReplyDlgComponent, {
			senderName: this.request.sender.name,
			recipientName: this.request.recipient.name,
			replyId
		});
	}

	cancelReply(replyId: ID) {
		const text = translate('Are you sure you want to cancel this request item?');
		const action = translate('cancel item');
		this.dlgSrv.open(ConfirmDialogComponent, { text, action }).pipe(
			switchMap(_ => this.requestReplySrv.update({ id: replyId, status: ReplyStatus.CANCELED })),
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

	cancelReplies() {
		const text = translate('Are you sure you want to cancel these request items?');
		const action = translate('cancel items');
		const items = this.listSrv.selectionSrv.getSelectionValues().map(element => ({ id: element.reply.id, status: ReplyStatus.CANCELED }));
		this.dlgSrv.open(ConfirmDialogComponent, { text, action }).pipe(
			switchMap(_ => this.requestReplySrv.updateMany(items)),
			switchMap(_ => this.listSrv.refetch())
		).subscribe(_ => this.listSrv.selectionSrv.unselectAll());
	}
}
