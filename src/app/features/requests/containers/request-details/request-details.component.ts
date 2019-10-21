import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CommonModalService, RefuseReplyDlgComponent } from '~common/modals';
import { ReviewRequestReplyDlgComponent } from '~common/modals/component/review-request-reply-dlg/review-request-reply-dlg.component';
import { RequestElementService, RequestReplyService, SupplierRequestService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { ERM, ReplyStatus, RequestElement, SupplierRequest } from '~core/models';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub, ID } from '~utils';

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
		private dlgSrv: DialogService,
		private translate: TranslateService
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
				title: this.translate.instant('title.request-not-exist'),
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
			title: this.translate.instant('title.error'),
			message: this.translate.instant('error.there-is-an-error'),
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
		const text = this.translate.instant('message.confirm-cancel-request-item');
		const action = this.translate.instant('button.cancel-item');
		this.dlgSrv.open(ConfirmDialogComponent, { text, action }).pipe(
			switchMap(_ => this.requestReplySrv.update({ id: replyId, status: ReplyStatus.CANCELED })),
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

	cancelReplies() {
		const text = this.translate.instant('message.confirm-cancel-request-items');
		const action = this.translate.instant('button.cancel-items');
		const items = this.listSrv.selectionSrv.getSelectionValues().map(element => ({ id: element.reply.id, status: ReplyStatus.CANCELED }));
		this.dlgSrv.open(ConfirmDialogComponent, { text, action }).pipe(
			switchMap(_ => this.requestReplySrv.updateMany(items)),
			switchMap(_ => this.listSrv.refetch())
		).subscribe(_ => this.listSrv.selectionSrv.unselectAll());
	}
}
