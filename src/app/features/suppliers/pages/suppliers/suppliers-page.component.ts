import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SuppliersTableComponent } from '~common/tables/suppliers-table/suppliers-table.component';
import { SupplierService } from '~core/erm';
import { ListPageService } from '~core/list-page';
import { SelectParamsConfig } from '~core/erm';
import { ERM, Supplier } from '~core/erm';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';

// A doctor accidentally prescribes his patient a laxative instead of a coughing syrup.
// -
// Three days later the patient comes for a check-up and the doctor asks: “Well? Are you still coughing?”
// -
// The patient replies: “No. I’m afraid to.”

@Component({
	selector: 'supplier-page-app',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss'],
	providers: [
		ListPageService
	],
	host: {
		class: 'table-page'
	}
})
export class SuppliersPageComponent extends AutoUnsub implements OnInit, AfterViewInit {

	erm = ERM;
	filterType = FilterType;

	filterTypes = [
		FilterType.CATEGORIES,
		FilterType.CREATED_BY,
		FilterType.FAVORITE,
		FilterType.SUPPLIER_STATUS,
		FilterType.TAGS
	];

	columns = SuppliersTableComponent.DEFAULT_COLUMNS;
	tableConfig = SuppliersTableComponent.DEFAULT_TABLE_CONFIG;

	private selectItemsConfig: SelectParamsConfig = { query: 'deleted == false AND  archived == false' };

	public tableWidth: string;
	public addSupplierMargin: string;

	constructor(
		private supplierSrv: SupplierService,
		public listSrv: ListPageService<Supplier, SupplierService>,
		public dialogCommonSrv: DialogCommonService,
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.supplierSrv,
			searchedFields: ['name', 'tags.name', 'categories.name', 'description'],
			initialFilters: [
				{ type: FilterType.DELETED, value: false },
				{ type: FilterType.ARCHIVED, value: false }
			],
			entityMetadata: ERM.SUPPLIER,
		}, false);
	}

	ngAfterViewInit() {
		this.listSrv.loadData(this._destroy$);
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

}
