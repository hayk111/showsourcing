import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RefuseReplyDlgComponent } from '~common/dialogs/custom-dialogs';
import {
	ReviewRequestReplyDlgComponent,
} from '~common/dialogs/custom-dialogs/review-request-reply-dlg/review-request-reply-dlg.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { RequestElementService, RequestReplyService, SupplierRequestService } from '~core/erm';
import { ListPageService } from '~core/list-page';
import { ERM, ReplyStatus, RequestElement, SupplierRequest } from '~core/erm';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { ToastService, ToastType } from '~shared/toast';
import { AutoUnsub, ID } from '~utils';

@Component({
	selector: 'request-details-page-app',
	templateUrl: './request-details-page.component.html',
	styleUrls: ['./request-details-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestDetailsPageComponent extends AutoUnsub implements OnInit {

	private requestElements: RequestElement[];
	request: SupplierRequest;
	requestId: string;
	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private suppReqSrv: SupplierRequestService,
		private toastSrv: ToastService,
		private requestReplySrv: RequestReplyService,
		private cdr: ChangeDetectorRef,
		private reqElementSrv: RequestElementService,
		public dialogCommonSrv: DialogCommonService,
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
		).subscribe(
			request => this.onRequest(request),
			err => this.onError(err)
		);
	}

	private onRequest(request) {
		if (!request) {
			this.toastSrv.add({
				type: ToastType.ERROR,
				title: 'title.request-not-exist',
				timeout: 3500
			});
			this.router.navigate(['requests']);
		} else {
			this.request = request;
			this.cdr.detectChanges();
		}
	}

	private onError(error) {
		this.toastSrv.add({
			type: ToastType.ERROR,
			title: 'title.error',
			message: 'message.there-is-an-error',
			timeout: 3500
		});
		this.router.navigate(['requests']);
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
		const text = 'message.confirm-cancel-request-item';
		const action = 'buttoncancel-item';
		this.dlgSrv.open(ConfirmDialogComponent, { text, action }).pipe(
			switchMap(_ => this.requestReplySrv.update({ id: replyId, status: ReplyStatus.CANCELED })),
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

	cancelReplies() {
		const text = 'message.confirm-cancel-request-items';
		const action = 'button.cancel-items';
		const items = this.listSrv.selectionSrv.getSelectionValues()
			.map((element: any) => ({ id: element.reply.id, status: ReplyStatus.CANCELED }));
		this.dlgSrv.open(ConfirmDialogComponent, { text, action }).pipe(
			switchMap(_ => this.requestReplySrv.updateMany(items)),
			switchMap(_ => this.listSrv.refetch())
		).subscribe(_ => this.listSrv.selectionSrv.unselectAll());
	}
}
