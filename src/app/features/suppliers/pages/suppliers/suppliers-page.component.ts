import { AfterViewInit, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { SupplierService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { SelectParamsConfig } from '~entity-services/_global/select-params';
import { SupplierFeatureService } from '../../services';
import { ERM, Supplier } from '~models';
import { FilterType } from '~shared/filters';
import { ControllerListService } from '~shared/header-list/services/controller-list.service';
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
	]
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
		private featureSrv: SupplierFeatureService,
		private notifSrv: NotificationService,
		public listSrv: ListPageService<Supplier, SupplierService>,
		public commonModalSrv: CommonModalService,
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

	onViewChange(view: 'list' | 'board' | 'card') {
		this.listSrv.changeView(view);
	}

	ngAfterViewInit() {
		this.listSrv.loadData(this._destroy$);
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

	onClearFilters() {
		this.listSrv.filterList.resetAll();

		this.listSrv.addFilter({ type: FilterType.ARCHIVED, value: false});
		this.listSrv.addFilter({ type: FilterType.DELETED, value: false});

		this.controllerListService.onFiltersClear();
	}

	onArchive(supplier: Supplier | Supplier[]) {
		// TODO i18n
		if (Array.isArray(supplier)) {
			this.featureSrv.updateMany(supplier.map((p: Supplier) => ({ id: p.id, archived: true })))
				.pipe(switchMap(_ => this.listSrv.refetch()))
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: 'Supplier archived',
						message: 'Suppliers have been archived with success'
					});
				});
		} else {
			const { id } = supplier;
			this.featureSrv.update({ id, archived: true })
				.pipe(switchMap(_ => this.listSrv.refetch()))
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: 'Supplier archived',
						message: 'Suppliers have been archived with success'
					});
				});
		}
	}
}
