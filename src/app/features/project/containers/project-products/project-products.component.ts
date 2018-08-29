import { ChangeDetectionStrategy, Component, OnInit, NgModuleRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, takeUntil, switchMap, tap, catchError, take, first } from 'rxjs/operators';
import { NewProductDialogComponent } from '~features/products/components/new-product-dialog/new-product-dialog.component';
import { ProductService, ProjectService } from '~global-services';
import { ERM, Product, Project } from '~models';
import { DialogService } from '~shared/dialog';
import { SearchService, FilterType, Filter } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { FindProductsDialogComponent } from '~shared/product/containers/find-products-dialog/find-products-dialog.component';
import { ProjectWorkflowFeatureService } from '~features/project/services';
import { NotificationService, NotificationType } from '~shared/notifications';


@Component({
	selector: 'project-products-app',
	templateUrl: './project-products.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SelectionService,
	]
})
export class ProjectProductsComponent extends ListPageComponent<Product, ProductService> implements OnInit {

	project$: Observable<Project>;
	private projectId: string;
	private project: Project;

	constructor(
		protected router: Router,
		protected srv: ProductService,
		protected projectSrv: ProjectService,
		protected selectionSrv: SelectionService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected route: ActivatedRoute,
		protected moduleRef: NgModuleRef<any>,
		protected featureSrv: ProjectWorkflowFeatureService,
		private notifSrv: NotificationService) {
			super(router, srv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT, FindProductsDialogComponent);
	}

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
			tap(id => this.projectId = id)
		);
		id$.pipe(
			takeUntil(this._destroy$),
			switchMap(id => this.projectSrv.selectOne(id))
		).subscribe((project) => {
			this.project = project;
		});
		this.project$ = id$.pipe(switchMap(id => this.projectSrv.queryOne(id)));
		// we need to wait to have the id to call super.ngOnInit, because we want the filter
		// method to be called when we actually have the id
		id$.pipe(
			first()
		).subscribe(_ => super.ngOnInit());

		// add filter for the project
		id$.pipe(
			takeUntil(this._destroy$),
			first()
		).subscribe(id => {
			this.addFilter({
				type: FilterType.PROJECTS,
				value: id
			});
		});
	}

	/**
	 * Deassociate the selected product from the current project
	 */
	deassociateProduct(product: Product) {
		this.featureSrv.manageProjectsToProductsAssociations([ this.project ], [], [ product ]).pipe(
			tap(() => {
				this.refetch({ query: this.filterList.asQuery() });
				this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: 'Products Updated',
					message: 'The products were updated in the project with success',
					timeout: 3500
				});
			})
		).subscribe();
	}

	/**
	 * Associate the selected products from the current project. This method is
	 * passed as callback for the "find products" dialog.
	 */
	associatedProductsWithProject({ selectedProducts, unselectedProducts }: { selectedProducts: Product[], unselectedProducts: Product[] }) {
		return this.featureSrv.manageProjectsToProductsAssociations([ this.project ], selectedProducts, unselectedProducts).pipe(
			tap(() => {
				this.refetch({ query: this.filterList.asQuery() });
				this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: 'Products Updated',
					message: 'The products were updated in the project with success',
					timeout: 3500
				});
			})
		);
	}

	/** Open the find products dialog and passing selected products to it */
	openFindProductDlg() {
		if (this.project) {
			this.featureSrv.getProjectProducts(this.project).pipe(first()).subscribe(products => {
				this.dlgSrv.openFromModule(this.createDlgComponent, this.moduleRef, {
					type: this.entityMetadata,
					shouldRedirect: false,
					initialSelectedProducts: products,
					submitCallback: this.associatedProductsWithProject.bind(this)
				});
			});
		}
	}
}
