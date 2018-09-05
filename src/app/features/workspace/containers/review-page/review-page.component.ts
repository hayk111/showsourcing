import { ChangeDetectorRef, Component, NgModuleRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap, first, takeUntil } from 'rxjs/operators';
import { WorkspaceFeatureService } from '~features/workspace/services/workspace-feature.service';
import { ProductService, ProjectService } from '~global-services';
import { ERM, Product, Project, ProductStatus } from '~models';
import {
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
} from '~shared/custom-dialog';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SearchService } from '~shared/filters';


@Component({
	selector: 'workspace-review-page-app',
	templateUrl: './review-page.component.html',
	styleUrls: ['./review-page.component.scss']
})
export class ReviewPageComponent extends ListPageComponent<Product, WorkspaceFeatureService> implements OnInit {

	products$ = new Subject<Product[]>();
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;
	currentSort = { sortBy: 'supplier.name', descending: true };

	constructor(
		protected router: Router,
		protected featureSrv: WorkspaceFeatureService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService,
		protected cdr: ChangeDetectorRef,
		protected workspaceSrv: WorkspaceFeatureService,
		protected moduleRef: NgModuleRef<any>) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT);
	}

	onItemFavorited(event) {
		console.log('>> onItemFavorited - event = ', event);
	}

	ngOnInit() {
		this.workspaceSrv.getProducts(this.currentSort).pipe(
			takeUntil(this._destroy$)
		).subscribe(products => {
			this.products$.next(products);
		});

		this.selected$ = this.selectionSrv.selection$;
	}

	search(search: string) {
		this.workspaceSrv.getProducts(this.currentSort/*, search*/).pipe(
			takeUntil(this._destroy$)
		).subscribe(products => {
			this.products$.next(products);
		});
	}

	onUpdateProductStatus({ target, droppedElement }) {
		this.workspaceSrv.updateProductStatus(droppedElement, target)
			.subscribe(() => {
				this.cdr.detectChanges();
			});
	}

	/** Selects a an entity */
	onItemSelected(entity: any) {
		this.selectionSrv.selectOne(entity);
	}

	/** Unselects a entity */
	onItemUnselected(entity: any) {
		this.selectionSrv.unselectOne(entity);
	}

	/** Selects an entity */
	onAllItemsSelected(entity: any) {
		this.selectionSrv.selectAll(entity);
	}

	/** Unselects a entity */
	onAllItemsUnselected(entity: any) {
		this.selectionSrv.unselectOne(entity);
	}

	/**
	 * Selection bar actions
	 *
	 * Each of the actions to open dialog below will open a dialog that is itself a container.
	 */

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectedProducts()
		});
	}


	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductExportDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectedProducts()
		});
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductRequestTeamFeedbackDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectedProducts()
		});
	}

	/** Will show a confirm dialog to delete items selected */
	deleteSelected() {
		const items = Array.from(this.selectionSrv.selection.keys());
		// callback for confirm dialog
		const callback = () => {
			this.workspaceSrv.deleteMany(items).subscribe(() => {
				this.resetSelection();
			});
		};
		const text = `Delete ${items.length} ${items.length > 1 ? ERM.ITEM.plural : ERM.ITEM.singular} ?`;
		this.dlgSrv.open(ConfirmDialogComponent, { text, callback });
	}

	/** Unselect all entity */
	resetSelection() {
		this.selectionSrv.unselectAll();
	}

	getSelectedProducts() {
		return Array.from(this.selectionSrv.selection.values());
	}

	sortFromMenu(fieldName) {
		if (this.currentSort && this.currentSort.sortBy === fieldName) {
			this.currentSort = { ...this.currentSort, descending: !this.currentSort.descending };
		} else {
			this.currentSort = { ...this.currentSort, sortBy: fieldName };
		}
		this.doSort(this.currentSort);
	}

	sort(event) {
		this.currentSort = event;
		this.doSort(event);
	}

	doSort(sort) {
		this.workspaceSrv.getProducts(sort, true).pipe(first()).subscribe(products => {
			this.products$.next(products);
		});
	}

}
