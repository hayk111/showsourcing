import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil, switchMap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { RequestElementService, RequestReplyService, SupplierRequestService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, RequestElement, ReplyStatus } from '~core/models';
import { AutoUnsub, ID } from '~utils';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DialogService } from '~shared/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'product-requests-app',
	templateUrl: './product-requests.component.html',
	styleUrls: ['./product-requests.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductRequestsComponent extends AutoUnsub implements OnInit {

	constructor(
		private router: Router,
		private requestElementSrv: RequestElementService,
		private requestReplySrv: RequestReplyService,
		private requestSrv: SupplierRequestService,
		private dlgSrv: DialogService,
		private route: ActivatedRoute,
		public listSrv: ListPageService<RequestElement, RequestElementService>,
		public commonModalSrv: CommonModalService,
		private translate: TranslateService
	) { super(); }

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		);

		id$.subscribe(id => {
			this.listSrv.setup({
				key: `${ListPageKey.REQUEST_ELEMENT}-${id}`,
				entitySrv: this.requestElementSrv,
				selectParams: { sortBy: 'name', query: `targetedEntityType == "Product" && targetId == "${id}"` },
				entityMetadata: ERM.REQUEST_ELEMENT,
				searchedFields: [],
				originComponentDestroy$: this._destroy$
			});
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

	openRequestDetails(reqElemId: ID) {
		this.requestSrv.queryOneByPredicate(`requestElements.id == "${reqElemId}"`)
			.subscribe(request => {
				if (request && request.id)
					this.router.navigate([ERM.SUPPLIER_REQUEST.destUrl, request.id]);
			});
	}
}
