import { Component, OnInit, AfterViewInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { SupplierService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, Supplier } from '~models';
import { FilterType } from '~shared/filters';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils';
import { SupplierFeatureService } from '~features/supplier/services';
import { SelectParamsConfig } from '~entity-services/_global/select-params';
import { SubPanelService } from '~shared/top-panel/services/sub-panel.service';

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
		private subPanelSrv: SubPanelService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.SUPPLIER,
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

		this.subPanelSrv.onFiltersClear();
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
