import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
	SupplierRequestDialogComponent,
} from '~common/modals/component/supplier-request-dialog/supplier-request-dialog.component';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ProductService } from '~entity-services';
import { ERM, Product, Project } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { NotificationService, NotificationType } from '~shared/notifications';
import { ProductFeatureService } from '~features/products/services';
import { ProjectFeatureService } from '~features/project/services';

@Component({
	selector: 'project-products-app',
	styleUrls: ['project-products.component.scss'],
	templateUrl: './project-products.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService, ProductFeatureService
	]
})
export class ProjectProductsComponent extends AutoUnsub implements OnInit, AfterViewInit {

	project$: Observable<Project>;
	private project: Project;
	erm = ERM;

	filterTypes = [
		FilterType.ARCHIVED,
		FilterType.CATEGORY,
		FilterType.CREATED_BY,
		FilterType.EVENT,
		FilterType.FAVORITE,
		FilterType.PRODUCT_STATUS,
		FilterType.PROJECTS,
		FilterType.SUPPLIER,
		FilterType.TAGS
	];

	constructor(
		private featureSrv: ProjectFeatureService,
		private productFeatureSrv: ProductFeatureService,
		private dlgSrv: DialogService,
		private route: ActivatedRoute,
		private productSrv: ProductService,
		public listSrv: ListPageService<Product, ProductService>,
		public commonModalSrv: CommonModalService,
		private notifSrv: NotificationService
	) {
		super();
	}

	ngOnInit() {
		const id = this.route.parent.snapshot.params.id;
		this.project$ = this.featureSrv.queryOne(id);

		this.project$.subscribe(proj => this.project = proj);

		// we need to wait to have the id to call super.ngOnInit, because we want to specify the initialQuery
		// whne the id is there
		this.listSrv.setup({
			key: `${ListPageKey.PROJECTS_PRODUCT}-${id}`,
			entitySrv: this.productSrv,
			searchedFields: ['name'],
			selectParams: {
				query: `projects.id == "${id}" AND deleted == false`,
				sortBy: 'category.name',
				descending: true
			},
			initialFilters: [{ type: FilterType.ARCHIVED, value: false }, { type: FilterType.DELETED, value: false }],
			originComponentDestroy$: this._destroy$,
			entityMetadata: ERM.PRODUCT,
		});
	}

	ngAfterViewInit() {
		this.listSrv.loadData(this._destroy$);
	}

	/**
	 * Deassociate the product from the current project
	 */
	deassociateProductById(id: string) {
		const unselectedProducts = [{ id }];
		this.featureSrv.manageProjectsToProductsAssociations(
			[this.project], { unselectedProducts }).pipe(
				switchMap(_ => this.listSrv.refetch())
			).subscribe();
	}

	/**
	 * Deassociate the selected products from the current project
	 */
	deassociateSelectedProducts() {
		const unselectedProducts = this.listSrv.getSelectedIds().map(id => ({ id }));
		this.featureSrv.manageProjectsToProductsAssociations(
			[this.project], { unselectedProducts }).pipe(
				switchMap(_ => this.listSrv.refetch())
			).subscribe();
		this.listSrv.unselectAll();
	}

	/** Open the find products dialog and passing selected products to it */
	openFindProductDlg() {
		this.featureSrv.openFindProductDlg(this.project).pipe(
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

	onArchive(product: Product | Product[]) {
		// TODO i18n
		if (Array.isArray(product)) {
			this.productFeatureSrv.updateMany(product.map((p: Product) => ({id: p.id, archived: true})))
				.pipe(switchMap(_ => this.listSrv.refetch()))
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: 'Products archived',
						message: 'Products have been archived with success'
					});
				});
		} else {
			const { id } = product;
			this.productFeatureSrv.update({ id, archived: true })
				.pipe(switchMap(_ => this.listSrv.refetch()))
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: 'Product archived',
						message: 'Products have been archived with success'
					});
				});
		}
	}

	onOpenCreateRequestDlg(products: Product[]) {
		return this.dlgSrv.open(SupplierRequestDialogComponent, { products });
	}
}
