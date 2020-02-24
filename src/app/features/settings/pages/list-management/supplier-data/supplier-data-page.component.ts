import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SupplierService, TeamService, CompanyService } from '~core/erm';
import { SelectParamsConfig } from '~core/erm';
import { ListPageService } from '~core/list-page';
import { SelectionService } from '~core/list-page';
import { ERM, Supplier } from '~core/erm';
import { AutoUnsub } from '~utils';
import { PaginationService } from '~shared/pagination/services/pagination.service';

@Component({
	selector: 'supplier-data-page-app',
	templateUrl: '../shared/list-management-template.html',
	styleUrls: ['./supplier-data-page.component.scss', '../shared/list-management-styles.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService,
		SelectionService
	],
	host: {
		class: 'table-page'
	},
})
export class SupplierDataPageComponent extends AutoUnsub implements OnInit {

	erm = ERM.SUPPLIER;
	addButtonWidth = '111px';
	addButtonHeight = '32px';

	selectItemsConfig: SelectParamsConfig;

	constructor(
		private supplierSrv: SupplierService,
		private paginationSrv: PaginationService,
		public listSrv: ListPageService<Supplier, SupplierService>,
		public teamSrv: TeamService,
		public companySrv: CompanyService,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
	) { super(); }


	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.supplierSrv,
			searchedFields: ['name'],
			selectParams: { sortBy: 'name', descending: false, query: 'deleted == false' },
			entityMetadata: ERM.SUPPLIER,
			originComponentDestroy$: this._destroy$
		});
	}

	mergeSelected() {
		const suppliers = this.listSrv.getSelectedValues();
		this.dialogCommonSrv.openMergeDialog({
			type: this.listSrv.entityMetadata,
			entities: suppliers
		});
	}

	showItemsPerPage(count: number) {
		this.paginationSrv.setPerPageItems(count);
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

}
