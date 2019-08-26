import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModalService } from '~common/modals';
import { SupplierService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, Supplier } from '~models';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { switchMap } from 'rxjs/operators';
import { NotificationService, NotificationType } from '~shared/notifications';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { SCREEN_MAX_WIDTH_OVERLAP, FILTERS_PANE_WIDTH } from '~features/const';

@Component({
	selector: 'supplier-page-app',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss'],
	providers: [
		ListPageService
	]
})
export class SuppliersPageComponent extends AutoUnsub implements OnInit, AfterViewInit {
	@ViewChild('supplierList', { read: ElementRef, static: false })
	public supplierListElem: ElementRef;

	erm = ERM;

	filterTypes = [
		FilterType.CATEGORIES,
		FilterType.CREATED_BY,
		FilterType.FAVORITE,
		FilterType.SUPPLIER_STATUS,
		FilterType.TAGS
	];

	private selectItemsConfig: SelectParamsConfig = { query: 'deleted == false AND archived == false' };

	public tableWidth: string;
	public addSupplierMargin: string;

	constructor(
		private supplierSrv: SupplierService,
		public listSrv: ListPageService<Supplier, SupplierService>,
		public commonModalSrv: CommonModalService,
		private featureSrv: SupplierFeatureService,
		private notifSrv: NotificationService,
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.SUPPLIER,
			entitySrv: this.supplierSrv,
			searchedFields: ['name', 'tags.name', 'categories.name', 'description'],
			selectParams: this.selectItemsConfig,
			entityMetadata: ERM.SUPPLIER,
			initialFilters: [],
		}, false);
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig.take = Number(count);
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

	onShowFilters() {
		this.listSrv.openFilterPanel();
	}

	onCloseFilter() {
		this.listSrv.closeFilterPanel();
	}

	isOverlap(): boolean {
		const width = window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;

		return width <= SCREEN_MAX_WIDTH_OVERLAP;
	}

	onArchive(supplier: Supplier | Supplier[]) {
		// TODO i18n
		if (Array.isArray(supplier)) {
			this.featureSrv.updateMany(supplier.map((p: Supplier) => ({id: p.id, archived: true})))
				.pipe(switchMap(_ => this.listSrv.refetch()))
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: 'Suplier archived',
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
						title: 'Suplier archived',
						message: 'Suppliers have been archived with success'
					});
				});
		}
	}

	ngAfterViewInit() {
		this.listSrv.loadData(this._destroy$);
	}
}
