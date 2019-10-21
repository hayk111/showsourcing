import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { SupplierService } from '~core/entity-services';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { DataManagementService } from '~features/data-management/services/data-management.service';
import { ERM, Supplier } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'supplier-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./supplier-data-management-page.component.scss', '../data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class SupplierDataManagementPageComponent extends AutoUnsub implements OnInit {

	erm = ERM.SUPPLIER;
	addButtonWidth = '111px';
	addButtonHeight = '32px';

	selectItemsConfig: SelectParamsConfig;

	constructor(
		private supplierSrv: SupplierService,
		public listSrv: ListPageService<Supplier, SupplierService>,
		public commonModalSrv: CommonModalService,
		private dmSrv: DataManagementService
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
		this.dmSrv.merge(suppliers, this.listSrv.entityMetadata);
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = {take: Number(count)};
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

}
