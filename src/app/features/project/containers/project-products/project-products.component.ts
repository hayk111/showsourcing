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
import { FindProductsDialogComponent } from '~shared/product-common/containers/find-products-dialog/find-products-dialog.component';
import { ProjectWorkflowFeatureService } from '~features/project/services';
import { NotificationService, NotificationType } from '~shared/notifications';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { ThumbService } from '~shared/rating/services/thumbs.service';


@Component({
	selector: 'project-products-app',
	styleUrls: ['project-products.component.scss'],
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
		private notifSrv: NotificationService,
		private productSrv: ProductService,
		protected thumbSrv: ThumbService) {
		super(router, srv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT, null, FindProductsDialogComponent);
	}

	ngOnInit() {
		const id = this.route.parent.snapshot.params.id;
		this.projectId = id;
		this.project$ = this.projectSrv.queryOne(id);
		this.project$.subscribe(proj => this.project = proj);
		this.initialPredicate = `projects.id == "${id}" AND deleted == false`;
		// we need to wait to have the id to call super.ngOnInit, because we want to specify the initialQuery
		// whne the id is there
		super.ngOnInit();

	}

	search(str: string) {
		// the search predicate
		this.currentSearch = str ? `name CONTAINS[c] "${str}"`
			+ ` OR supplier.name CONTAINS[c] "${str}"`
			+ ` OR category.name CONTAINS[c] "${str}"`
			+ ` OR tags.name CONTAINS[c] "${str}"` : '';
		this.onPredicateChange();
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
				this.resetSelection();
			});
		};
		const text = `Deassociate ${items.length} ${items.length > 1 ? 'products' : 'product'} ?`;
		this.dlgSrv.open(ConfirmDialogComponent, { text, callback });
	}

	/**
	 * Deassociate the selected product from the current project
	 */
	deassociateProductsWithProject(products: Product[]) {
		return this.featureSrv.manageProjectsToProductsAssociations([this.project], [], products).pipe(
			tap(() => {
				this.refetchWithAllFilters();
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
				this.refetchWithAllFilters();
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
		this.selectionItems().forEach(item => {
			const votes = this.thumbSrv.thumbUpFromMulti(item, onHighlight);
			this.productSrv.update({ id: item.id, votes } as any).subscribe();
		});
	}

	// we have to override the method since we are using a project feature srv instead of a product
	onMultipleThumbDown(onHighlight: boolean) {
		this.selectionItems().forEach(item => {
			const votes = this.thumbSrv.thumbDownFromMulti(item, onHighlight);
			this.productSrv.update({ id: item.id, votes } as any).subscribe();
		});
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
