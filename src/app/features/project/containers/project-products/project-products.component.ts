import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ProductService } from '~entity-services';
import { ProjectFeatureService } from '~features/project/services';
import { ERM, Product, Project } from '~models';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { ProductFeatureService } from '~features/products/services';
import { NotificationService, NotificationType } from '~shared/notifications';
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
				query: `projects.id == "${id}" AND deleted == false AND archived == false`,
				sortBy: 'category.name',
				descending: true
			},
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
		if(Array.isArray(product)) {
			this.featureSrv.updateMany(product.map((p: Product) => ({id: p.id, archived: true})))
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: 'Products archived',
						message: 'Products have been archived with success'
					});
				});
		} else {
			const { id } = product;
			this.featureSrv.update({ id, archived: true })
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: 'Product archived',
						message: 'Products have been archived with success'
					});
				});
		}
	}

}
