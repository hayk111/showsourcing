import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { RequestsTableComponent } from '~common/tables/requests-table/requests-table.component';
import { RequestReplyService, SupplierRequestService, TeamService } from '~core/ORM/services';
import { SelectParams } from '~core/ORM/services/_global/select-params';
import { SelectParamsConfig } from '~core/ORM/services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { EntityTypeEnum, ERM, ReplyStatus, SupplierRequest } from '~core/ORM/models';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'requests-page-app',
	templateUrl: './requests-page.component.html',
	styleUrls: ['./requests-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	],
	host: {
		class: 'table-page'
	}
})
export class RequestsPageComponent extends AutoUnsub implements OnInit {

	erm = ERM;
	entityTypeEnum = EntityTypeEnum;

	columns = RequestsTableComponent.DEFAULT_COLUMNS;
	tableConfig = RequestsTableComponent.DEFAULT_TABLE_CONFIG;

	selectItemsConfig: SelectParamsConfig;

	constructor(
		private requestSrv: SupplierRequestService,
		private replySrv: RequestReplyService,
		public listSrv: ListPageService<SupplierRequest, SupplierRequestService>,
		public dialogCommonSrv: DialogCommonService,
		private dlgSrv: DialogService,
		private teamSrv: TeamService
	) { super(); }

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.requestSrv,
			searchedFields: ['title', 'message', 'recipient.name', 'recipient.email', 'recipient.company', 'templateName', 'requestElements.name'],
			entityMetadata: ERM.SUPPLIER_REQUEST,
			initialFilters: [
				{
					type: FilterType.CUSTOM,
					value: `senderTeamId == "${this.teamSrv.selectedTeamSync.id}"`,
				}
			],
			originComponentDestroy$: this._destroy$,
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

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

}
