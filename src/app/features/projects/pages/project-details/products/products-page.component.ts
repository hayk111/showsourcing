import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
	SupplierRequestDialogComponent,
} from '~common/dialogs/custom-dialogs/supplier-request-dialog/supplier-request-dialog.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { ProductService } from '~entity-services';
import { ProductFeatureService } from '~features/products/services';
import { ProjectFeatureService } from '~features/projects/services';
import { EntityTypeEnum, ERM, Product, Project } from '~models';
import { DialogService } from '~shared/dialog/services';
import { FilterType } from '~shared/filters';
import { ControllerListService } from '~shared/header/components/controller-list/services/controller-list.service';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'products-page-app',
	styleUrls: ['products-page.component.scss'],
	templateUrl: './products-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService, ProductFeatureService
	],
	host: {
		class: 'table-page'
	}
})
export class ProductsPageComponent extends AutoUnsub implements OnInit, AfterViewInit {

	@Output() delete = new EventEmitter<Project>();
	@Output() archive = new EventEmitter<Project>();

	project$: Observable<Project>;
	private project: Project;
	filterTypeEnum = FilterType;
	erm = ERM;
	entityTypeEnum = EntityTypeEnum;

	selectItemsConfig: SelectParamsConfig;

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
		private router: Router,
		private route: ActivatedRoute,
		private productSrv: ProductService,
		public listSrv: ListPageService<Product, ProductService>,
		public dialogCommonSrv: DialogCommonService,
		private notifSrv: NotificationService,
		private controllerListService: ControllerListService,
		private translate: TranslateService
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
		this.featureSrv.manageProjectsToProductsAssociations([this.project], { unselectedProducts })
			.pipe(
				switchMap(_ => this.listSrv.refetch())
			).subscribe();
	}

	/**
	 * Deassociate the selected products from the current project
	 */
	deassociateSelectedProducts() {
		const unselectedProducts = this.listSrv.getSelectedIds().map(id => ({ id }));
		this.featureSrv.manageProjectsToProductsAssociations([this.project], { unselectedProducts })
			.pipe(
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
		if (Array.isArray(product)) {
			this.productFeatureSrv.updateMany(product.map((p: Product) => ({ id: p.id, archived: true })))
				.pipe(switchMap(_ => this.listSrv.refetch()))
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: this.translate.instant('title.products-archived'),
						message: this.translate.instant('message.products-archived-successfully')
					});
				});
		} else {
			const { id } = product;
			this.productFeatureSrv.update({ id, archived: true })
				.pipe(switchMap(_ => this.listSrv.refetch()))
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: this.translate.instant('title.product-archived'),
						message: this.translate.instant('message.product-archived-successfully')
					});
				});
		}
	}

	onClearFilters() {
		this.listSrv.filterList.resetAll();

		this.listSrv.addFilter({ type: FilterType.ARCHIVED, value: false });
		this.listSrv.addFilter({ type: FilterType.DELETED, value: false });

		this.controllerListService.onFiltersClear();
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

	onOpenCreateRequestDlg(products: Product[]) {
		return this.dlgSrv.open(SupplierRequestDialogComponent, { products });
	}
}
