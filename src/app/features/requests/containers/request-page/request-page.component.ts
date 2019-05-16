import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { SupplierRequestService, RequestReplyService } from '~core/entity-services';
import { SelectParams } from '~core/entity-services/_global/select-params';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, RequestStatus, SupplierRequest, ReplyStatus } from '~core/models';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { AutoUnsub, ID } from '~utils';

@Component({
	selector: 'request-page-app',
	templateUrl: './request-page.component.html',
	styleUrls: ['./request-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestPageComponent extends AutoUnsub implements OnInit {

	erm = ERM;

	constructor(
		private requestSrv: SupplierRequestService,
		private replySrv: RequestReplyService,
		public listSrv: ListPageService<SupplierRequest, SupplierRequestService>,
		public commonModalSrv: CommonModalService,
		private dlgSrv: DialogService
	) { super(); }

	ngOnInit() {
		const selectParams = new SelectParams({ sortBy: 'sentDate' });
		this.listSrv.setup({
			key: ListPageKey.REQUEST,
			entitySrv: this.requestSrv,
			searchedFields: [],
			entityMetadata: ERM.SUPPLIER_REQUEST,
			initialFilters: [],
			originComponentDestroy$: this._destroy$,
			selectParams
		});
	}

	cancelRequest(request: SupplierRequest) {
		// TODO i18n
		const text = 'Are you sure you want to cancel this request ?';
		const action = 'Cancel request';
		const items = request.requestElements.map(element => (
			{ id: element.reply.id, status: ReplyStatus.CANCELED }
		));
		this.dlgSrv.open(ConfirmDialogComponent, { text, action }).pipe(
			switchMap(_ => this.replySrv.updateMany(items)),
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

	cancelSelectedRequests() {
		// TODO i18n
		const text = 'Are you sure you want to cancel these requests ?';
		const action = 'Cancel requests';
		const items = this.listSrv.selectionSrv.getSelectionValues()
			.map(request =>
				request.requestElements
					.map(element =>
						({
							id: element.reply.id, status: ReplyStatus.CANCELED
						})
					)).reduce((acc, val) => acc.concat(val));
		this.dlgSrv.open(ConfirmDialogComponent, { text, action }).pipe(
			switchMap(_ => this.replySrv.updateMany(items)),
			switchMap(_ => this.listSrv.refetch())
		).subscribe(_ => this.listSrv.unselectAll());
	}

}
