import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ExportRequestService } from '~core/erm';
import { SelectParamsConfig } from '~core/erm';
import { ListPageService } from '~core/list-page';
import { ERM, ExportRequest } from '~core/erm';
import { UserService } from '~core/erm';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'exports-page-app',
	templateUrl: './exports-page.component.html',
	styleUrls: ['./exports-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'table-page'
	},
})
export class ExportsPageComponent extends AutoUnsub implements OnInit, AfterViewInit {

	erm = ERM;
	selectItemsConfig: SelectParamsConfig;

	constructor(
		private userSrv: UserService,
		private exportSrv: ExportRequestService,
		public listSrv: ListPageService<ExportRequest, ExportRequestService>,
		public dialogCommonSrv: DialogCommonService
	) { super(); }


	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.exportSrv,
			searchedFields: ['format', 'status', 'createdBy.firstName', 'createdBy.lastName'],
			// by default we have deleted == false
			selectParams: { query: '' },
			entityMetadata: ERM.EXPORT_REQUEST,
			initialFilters: [],
			originComponentDestroy$: this._destroy$
		});
	}

	ngAfterViewInit() {
		// we need this refetch on after view init, otherwise if we come from the redirection of the
		// export-dlg.component we won't see the new request created
		this.listSrv.refetch().pipe(first()).subscribe();
	}

	downloadOne(exportReq: ExportRequest) {
		if (exportReq && exportReq.status === 'ready')
			this.exportSrv.retrieveFile(exportReq).subscribe(({ file, name }) => {
				saveAs(file, name);
			});
	}

	downloadSelected() {
		this.listSrv.selectionSrv.selection.forEach((exportReq: any) => {
			this.downloadOne(exportReq);
		});
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

	toggleMyExports(show: boolean) {
		const userId = this.userSrv.userSync.id;

		const filterMyExports = {
			type: FilterType.CREATED_BY,
			value: userId
		};

		if (show) {
			this.listSrv.addFilter(filterMyExports);
			return;
		}

		this.listSrv.removeFilter(filterMyExports);
	}
}
