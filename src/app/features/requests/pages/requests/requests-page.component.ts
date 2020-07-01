import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { RequestsTableComponent } from '~common/tables/requests-table/requests-table.component';
import {
	ERM,
	ReplyStatus,
	RequestReplyService,
	SelectParamsConfig,
	SupplierRequest
} from '~core/erm';
import { ListHelper2Service, SelectionService } from '~core/list-page2';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'requests-page-app',
	templateUrl: './requests-page.component.html',
	styleUrls: ['./requests-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListHelper2Service, SelectionService],
	host: {
		class: 'table-page',
	},
})
export class RequestsPageComponent extends AutoUnsub implements OnInit {
	erm = ERM;
	columns = RequestsTableComponent.DEFAULT_COLUMNS;
	tableConfig = RequestsTableComponent.DEFAULT_TABLE_CONFIG;

	selectItemsConfig: SelectParamsConfig;

	constructor(
		private replySrv: RequestReplyService,
		public listSrv: ListHelper2Service,
		public dlgCommonSrv: DialogCommonService,
		private selectionSrv: SelectionService
	) {
		super();
	}

	ngOnInit() {
		// this.listSrv.setup();
	}

	cancelRequest(request: SupplierRequest) {
		const text = 'Are you sure you want to cancel this request ?';
		const action = 'Cancel request';
		const items = request.requestElements.map((element) => ({
			id: element.reply.id,
			status: ReplyStatus.CANCELED,
		}));
		this.dlgCommonSrv
			.openConfirmDlg({ text, action })
			.data$.pipe(
				switchMap((_) => this.replySrv.updateMany(items)),
			)
			.subscribe();
	}

	cancelSelectedRequests() {
		const text = 'Are you sure you want to cancel these requests ?';
		const action = 'Cancel requests';
		const items = this.selectionSrv
			.getSelectedValues()
			.reduce((acc, request: any) => acc.concat(request.requestElements), [])
			.map((element) => ({ id: element.reply.id, status: ReplyStatus.CANCELED }));
		this.dlgCommonSrv
			.openConfirmDlg({ text, action })
			.data$.pipe(
				switchMap((_) => this.replySrv.updateMany(items)),
			)
			.subscribe((_) => this.selectionSrv.unselectAll());
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
	}
}
