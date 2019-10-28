import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { RequestReplyService, SupplierRequestService, TeamService } from '~core/entity-services';
import { SelectParams } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { EntityTypeEnum, ERM, ReplyStatus, SupplierRequest } from '~core/models';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'requests-page-app',
	templateUrl: './requests-page.component.html',
	styleUrls: ['./requests-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsPageComponent extends AutoUnsub implements OnInit {

	erm = ERM;
	entityTypeEnum = EntityTypeEnum;

	constructor(
		private requestSrv: SupplierRequestService,
		private replySrv: RequestReplyService,
		public listSrv: ListPageService<SupplierRequest, SupplierRequestService>,
		public dialogCommonSrv: DialogCommonService,
		private dlgSrv: DialogService,
		private teamSrv: TeamService
	) { super(); }

	ngOnInit() {
		const selectParams = new SelectParams({ sortBy: 'sentDate' });
		this.listSrv.setup({
			entitySrv: this.requestSrv,
			searchedFields: ['title', 'message', 'recipient.name', 'recipient.email', 'recipient.company', 'templateName', 'requestElements.name'],
			entityMetadata: ERM.SUPPLIER_REQUEST,
			initialFilters: [
				{
					type: FilterType.CUSTOM,
					value: `senderTeamId == "${this.teamSrv.selectedTeamSync.id}"`
				}
			],
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
			.reduce((acc, request) => acc.concat(request.requestElements), [])
			.map(element => ({ id: element.reply.id, status: ReplyStatus.CANCELED }));
		this.dlgSrv.open(ConfirmDialogComponent, { text, action }).pipe(
			switchMap(_ => this.replySrv.updateMany(items)),
			switchMap(_ => this.listSrv.refetch())
		).subscribe(_ => this.listSrv.unselectAll());
	}

}
