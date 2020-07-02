import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RefuseReplyDlgComponent } from '~common/dialogs/custom-dialogs';
import { ReviewRequestReplyDlgComponent } from '~common/dialogs/custom-dialogs/review-request-reply-dlg/review-request-reply-dlg.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import {
	ERM,
	ReplyStatus,
	RequestElement,
	RequestElementService,
	RequestReplyService,
	SupplierRequest,
	SupplierRequestService
} from '~core/erm';
import { DialogService } from '~shared/dialog';
import { ToastService, ToastType } from '~shared/toast';
import { AutoUnsub, ID } from '~utils';
import { ListHelper2Service, SelectionService } from '~core/list-page2';

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
		public dlgCommonSrv: DialogCommonService,
		public listHelper: ListHelper2Service,
		private dlgSrv: DialogService,
		private selectionSrv: SelectionService
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.params.pipe(
			map(params => params.id),
			tap(id => (this.requestId = id)),
			takeUntil(this._destroy$)
		);

		id$
			.pipe(
				tap(id => {
					// this.listHelper.setup('');
				}),
				switchMap(
					id => this.listHelper.data$,
					(id, items) => [id, items]
				),
				tap(([id, items]) => (this.requestElements = items ? items : [])),
				switchMap(([id, items]) => this.suppReqSrv.selectOne(id)),
				takeUntil(this._destroy$)
			)
			.subscribe(
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
		const selectedIndex = this.requestElements.findIndex(
			elem => elem.id === id
		);
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
		this.dlgCommonSrv.openConfirmDlg({ text, action }).data$
			.pipe(
				switchMap(_ =>
					this.requestReplySrv.update({
						id: replyId,
						status: ReplyStatus.CANCELED
					})
				),
			)
			.subscribe();
	}

	cancelReplies() {
		const text = 'message.confirm-cancel-request-items';
		const action = 'button.cancel-items';
		const items = this.selectionSrv
			.getSelectedIds()
			.map((id: string) => ({
				id,
				status: ReplyStatus.CANCELED
			}));
		this.dlgCommonSrv.openConfirmDlg({text, action}).data$
			.pipe(
				switchMap(_ => this.requestReplySrv.updateMany(items)),
			)
			.subscribe(_ => this.selectionSrv.unselectAll());
	}
}
