import { ChangeDetectionStrategy, Component, OnInit, NgModuleRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, takeUntil, switchMap, tap, catchError, take, first } from 'rxjs/operators';
import { ProductService, ProjectService } from '~global-services';
import { ERM, Product, Project, ERM_TOKEN } from '~models';
import { DialogService } from '~shared/dialog';
import { SearchService, FilterType, Filter } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { FindProductsDialogComponent } from '~shared/product-common/containers/find-products-dialog/find-products-dialog.component';
import { ProjectWorkflowFeatureService } from '~features/project/services';
import { NotificationService, NotificationType } from '~shared/notifications';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { RfqDialogComponent } from '~shared/custom-dialog';
import { SelectionWithFavoriteService } from '~shared/list-page/selection-with-favorite.service';
import { ListPageDataService } from '~shared/list-page/list-page-data.service';
import { ListPageViewService } from '~shared/list-page/list-page-view.service';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { ListPageProviders, ProviderKey } from '~shared/list-page/list-page-providers.class';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';

@Component({
	selector: 'project-products-app',
	styleUrls: ['project-products.component.scss'],
	templateUrl: './project-products.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageProviders.getProviders(ProviderKey.PROJECTS_PRODUCT, ERM.PRODUCT),
		CommonDialogService,
		{ provide: ERM_TOKEN, useValue: ERM.PRODUCT }]
})
export class ProjectProductsComponent extends TrackingComponent implements OnInit {

	project$: Observable<Project>;
	private projectId: string;
	private project: Project;

	constructor(
		protected router: Router,
		protected srv: ProductService,
		protected projectSrv: ProjectService,
		protected route: ActivatedRoute,
		protected moduleRef: NgModuleRef<any>,
		private notifSrv: NotificationService,
		private productSrv: ProductService,

		protected featureSrv: ProjectWorkflowFeatureService,
		protected viewSrv: ListPageViewService<Product>,
		public dataSrv: ListPageDataService<Product, ProductService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService,
		protected thumbSrv: ThumbService) {
		super();
	}

	ngOnInit() {
		const id = this.route.parent.snapshot.params.id;
		this.projectId = id;
		this.project$ = this.projectSrv.queryOne(id);
		this.project$.subscribe(proj => this.project = proj);
		this.dataSrv.initialPredicate = `projects.id == "${id}" AND deleted == false`;
		// we need to wait to have the id to call super.ngOnInit, because we want to specify the initialQuery
		// whne the id is there

	}

	search(str: string) {
		// the search predicate
		this.dataSrv.currentSearch = str ? `name CONTAINS[c] "${str}"`
			+ ` OR supplier.name CONTAINS[c] "${str}"`
			+ ` OR category.name CONTAINS[c] "${str}"`
			+ ` OR tags.name CONTAINS[c] "${str}"` : '';
		this.dataSrv.onPredicateChange();
	}

	/**
	 * Deassociate the product from the current project
	 */
	deassociateProductById(id: string) {
		this.deassociateProductsWithProject([{ id }]).subscribe();
	}

	/**
	 * Deassociate the selected products from the current project
	 */
	deassociateSelectedProducts() {
		const items = Array.from(this.selectionSrv.selection.keys());
		// callback for confirm dialog
		const callback = () => {
			this.deassociateProductsWithProject(items.map(id => ({ id }))).subscribe(() => {
				this.selectionSrv.unselectAll();
			});
		};
		const text = `Deassociate ${items.length} ${items.length > 1 ? 'products' : 'product'} ?`;
		this.commonDlgSrv.openConfirmDialog({ text, callback });
	}

	/**
	 * Deassociate the selected product from the current project
	 */
	deassociateProductsWithProject(products: Product[]) {
		return this.featureSrv.manageProjectsToProductsAssociations([this.project], [], products).pipe(
			tap(() => {
				this.dataSrv.refetch();
				this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: 'Products Updated',
					message: 'The products were updated in the project with success',
					timeout: 3500
				});
			})
		);
	}

	/**
	 * Associate the selected products from the current project. This method is
	 * passed as callback for the "find products" dialog.
	 */
	associatedProductsWithProject({ selectedProducts, unselectedProducts }: { selectedProducts: Product[], unselectedProducts: Product[] }) {
		return this.featureSrv.manageProjectsToProductsAssociations([this.project], selectedProducts, unselectedProducts).pipe(
			tap(() => {
				this.dataSrv.refetch();
				this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: 'Products Updated',
					message: 'The products were updated in the project with success',
					timeout: 3500
				});
			})
		);
	}

	// we have to override the method since we are using a project feature srv instead of a product
	onMultipleThumbUp(onHighlight: boolean) {
		this.selectionSrv.selection.forEach(item => {
			const votes = this.thumbSrv.thumbUpFromMulti(item, onHighlight);
			this.productSrv.update({ id: item.id, votes } as any).subscribe();
		});
	}

	// we have to override the method since we are using a project feature srv instead of a product
	onMultipleThumbDown(onHighlight: boolean) {
		this.selectionSrv.selection.forEach(item => {
			const votes = this.thumbSrv.thumbDownFromMulti(item, onHighlight);
			this.productSrv.update({ id: item.id, votes } as any).subscribe();
		});
	}

	/** Open the find products dialog and passing selected products to it */
	openFindProductDlg() {
		if (this.project) {
			this.featureSrv.getProjectProducts(this.project).pipe(first()).subscribe(products => {
				this.commonDlgSrv.openFindProductDlg(products, this.associatedProductsWithProject.bind(this));
			});
		}
	}

	openRequestQuotationDialog(product: Product) {
		this.commonDlgSrv.openRequestQuotationDialog(product);
	}

}
