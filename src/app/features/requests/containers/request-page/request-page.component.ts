import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { SupplierRequestService, TeamService } from '~core/entity-services';
import { SelectParams } from '~core/entity-services/_global/select-params';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, RequestStatus, SupplierRequest } from '~core/models';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { AutoUnsub, ID } from '~utils';
import { switchMap } from 'rxjs/operators';
import { FilterType } from '~shared/filters';

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
		public listSrv: ListPageService<SupplierRequest, SupplierRequestService>,
		public commonModalSrv: CommonModalService,
		private dlgSrv: DialogService,
		private teamSrv: TeamService
	) { super(); }

	ngOnInit() {
		const selectParams = new SelectParams({ sortBy: 'sentDate' });
		this.listSrv.setup({
			key: ListPageKey.REQUEST,
			entitySrv: this.requestSrv,
			searchedFields: [],
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

	cancelRequest(requestId: ID) {
		// TODO i18n
		const text = 'Are you sure you want to cancel this request ?';
		const action = 'Cancel request';
		this.dlgSrv.open(ConfirmDialogComponent, { text, action }).pipe(
			switchMap(_ => this.requestSrv.update({ id: requestId, status: RequestStatus.CANCELED })),
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

}
