import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SupplierService, TeamService, CompanyService } from '~core/entity-services';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { SelectionService } from '~core/list-page';
import { ERM, Supplier } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'supplier-data-page-app',
	templateUrl: '../shared/list-management-template.html',
	styleUrls: ['./supplier-data-page.component.scss', '../shared/list-management-styles.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService,
		SelectionService
	]
})
export class SupplierDataPageComponent extends AutoUnsub implements OnInit {

	erm = ERM.SUPPLIER;
	addButtonWidth = '111px';
	addButtonHeight = '32px';

	selectItemsConfig: SelectParamsConfig;

	constructor(
		private supplierSrv: SupplierService,
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
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

}
