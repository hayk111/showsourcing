import { Component, OnInit, AfterViewInit } from '@angular/core';
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

	filterTypes = [
		FilterType.CATEGORIES,
		FilterType.CREATED_BY,
		FilterType.FAVORITE,
		FilterType.SUPPLIER_STATUS,
		FilterType.TAGS
	];

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
			selectParams: { query: 'deleted == false AND archived == false' },
			entityMetadata: ERM.SUPPLIER,
			initialFilters: [],
		}, false);
	}

	onShowArchived() {
		const archivedFilter = { type: FilterType.ARCHIVED, value: true };
		this.listSrv.addFilter(archivedFilter);

		this.listSrv.refetch({
			query: 'deleted == false AND archived == true',
		}).subscribe();
	}

	onHideArchived() {
		const archivedFilter = { type: FilterType.ARCHIVED, value: true };
		this.listSrv.removeFilter(archivedFilter);

		this.listSrv.refetch({
			query: 'deleted == false AND archived == false',
		}).subscribe();
	}

	onShowAssignee() {
		const archivedFilter = { type: FilterType.ASSIGNEE, value: true };
		this.listSrv.addFilter(archivedFilter);
	}

	onHideAssignee() {
		const archivedFilter = { type: FilterType.ASSIGNEE, value: true };
		this.listSrv.removeFilter(archivedFilter);
	}

	// can be moved to ListPageService
	onArchive(supplier: Supplier | Supplier[]) {
		// TODO i18n
		if (Array.isArray(supplier)) {
			this.featureSrv.updateMany(supplier.map((p: Supplier) => ({id: p.id, archived: true})))
				.pipe(switchMap(_ => this.listSrv.refetch()))
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: 'Suplier archived',
						message: 'Supliers have been archived with success'
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
						message: 'Supliers have been archived with success'
					});
				});
		}
	}

	ngAfterViewInit() {
		this.listSrv.loadData(this._destroy$);
	}
}
