import { AfterViewInit, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SupplierService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { SelectParamsConfig } from '~entity-services/_global/select-params';
import { ERM, Supplier } from '~models';
import { FilterType } from '~shared/filters';
import { ControllerListService } from '~shared/controller-table/services/controller-table.service';
import { NotificationService, NotificationType } from '~shared/notifications';
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

	// TODO BackEnd
	// private selectItemsConfig: SelectParamsConfig = { query: 'deleted == false AND archived == false' };
	private selectItemsConfig: SelectParamsConfig = { query: 'deleted == false' };

	public tableWidth: string;
	public addSupplierMargin: string;

	constructor(
		private supplierSrv: SupplierService,
		private notifSrv: NotificationService,
		public listSrv: ListPageService<Supplier, SupplierService>,
		public dialogCommonSrv: DialogCommonService,
		private controllerListService: ControllerListService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.supplierSrv,
			searchedFields: ['name', 'tags.name', 'categories.name', 'description'],
			// initialFilters: [{ type: FilterType.ARCHIVED, value: false }, { type: FilterType.DELETED, value: false }],
			initialFilters: [{ type: FilterType.DELETED, value: false }],
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
