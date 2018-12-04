import { ChangeDetectionStrategy, Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { ProductService, ProjectService } from '~entity-services';
import { ProjectWorkflowFeatureService } from '~features/project/services';
import { Product, Project } from '~models';
import { NotificationService, NotificationType } from '~shared/notifications';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'project-products-app',
	styleUrls: ['project-products.component.scss'],
	templateUrl: './project-products.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageDataService,
		ListPageViewService,
		SelectionWithFavoriteService,
		CommonDialogService
	]
})
export class ProjectProductsComponent extends TrackingComponent implements OnInit {

	project$: Observable<Project>;
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
		this.project$ = this.projectSrv.queryOne(id);
		this.project$.subscribe(proj => this.project = proj);
		// we need to wait to have the id to call super.ngOnInit, because we want to specify the initialQuery
		// whne the id is there
		this.dataSrv.setup({
			featureSrv: this.productSrv,
			searchedFields: ['name'],
			initialSortBy: 'name',
			initialPredicate: `projects.id == "${id}" AND deleted == false`
		});
		this.dataSrv.init();

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

	/** Open the find products dialog and passing selected products to it */
	openFindProductDlg() {
		if (this.project) {
			this.featureSrv.getProjectProducts(this.project).pipe(first())
				.subscribe(products => {
					this.commonDlgSrv.openFindProductDlg(products, this.associatedProductsWithProject.bind(this));
				});
		}
	}

	openRequestQuotationDialog(product: Product) {
		this.commonDlgSrv.openRequestQuotationDialog(product);
	}

}
