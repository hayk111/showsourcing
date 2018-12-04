import {
	ChangeDetectorRef,
	Component,
	OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map} from 'rxjs/operators';
import { ERM, ERM_TOKEN, Product, ProductVote } from '~models';

import { ThumbService } from '~shared/rating/services/thumbs.service';
import { TrackingComponent } from '~utils/tracking-component';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import {
	ListPageProviders,
	ProviderKey
} from '~core/list-page/list-page-providers.class';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { statusProductToKanbanCol } from '~utils/kanban.utils';
import { AutoUnsub } from '~utils/auto-unsub.component';
import {
	ProductService,
	ProductStatusTypeService
} from '~entity-services';
import { ProductQueries } from '~entity-services/product/product.queries';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';
@Component({
	selector: 'workspace-my-workflow-page-app',
	templateUrl: './my-workflow-page.component.html',
	styleUrls: ['./my-workflow-page.component.scss'],
	providers: [
		ListPageProviders.getProviders(ProviderKey.SHOW, ERM.SHOW),
		CommonDialogService,
		{ provide: ERM_TOKEN, useValue: ERM.SHOW }
	]
})
export class MyWorkflowPageComponent extends AutoUnsub implements OnInit {
	columns$: Observable<KanbanColumn[]>;
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;

	constructor(
		protected router: Router,
		protected featureSrv: ProductService,
		protected productStatusSrv: ProductStatusTypeService,
		protected cdr: ChangeDetectorRef,
		protected thumbSrv: ThumbService,
		protected viewSrv: ListPageViewService<Product>,
		public dataSrv: ListPageDataService<Product, ProductService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
	) {
		super();
	}

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['name'],
			initialSortBy: 'name'
		});
		this.dataSrv.init();
		this.selectionSrv.unselectAll();
		const products$ = this.featureSrv
			.queryAll(ProductQueries.many, {
				query:
					`status.id != null AND status.status.id != null ` +
					`&& status.status.inWorkflow == true ` +
					`AND archived == false && deleted == false`,
				sortBy: 'lastUpdatedDate'
			})
			.pipe(
				map(products =>
					products.sort(
						(a, b) =>
							+new Date(b.lastUpdatedDate) - +new Date(a.lastUpdatedDate)
					)
				)
			);
		const productStatuses$ = this.productStatusSrv
			.queryAll(undefined, {
				query: 'category != "refused" AND category != "inspiration"',
				sortBy: 'step'
			})
			.pipe();

		this.columns$ = combineLatest(
			productStatuses$,
			products$,
			statusProductToKanbanCol
		);

		this.selected$ = this.selectionSrv.selection$;
	}

	/** Convert statuses / products into the generic input for kanban */
	convertStatusesToColumns(statuses) {
		return statuses.map(status => ({
			id: status.id,
			name: status.name,
			color: this.getColumnColor(status),
			disabled: status.name === '_NoStatus',
			data: status.products.map(product => {
				return {
					...product,
					cat:
						product.status && product.status.status
							? {
									id: product.status.status.id
								}
							: { id: -1 }
				};
			})
		}));
	}

	getColumnColor(status) {
		if (status.category === 'validated') {
			return 'var(--color-success)';
		}
		if (status.category === 'refused') {
			return 'var(--color-warn)';
		}
		if (!status.category) {
			return 'var(--color-accent)';
		}
		return 'var(--color-in-progress)';
	}

	getCurrentColumnFct(data) {
		return data.cat ? data.cat.id : '';
	}

	/** updates the products with the new value votes */
	multipleVotes(votes: Map<string, ProductVote[]>) {
		votes.forEach((v, k) => this.dataSrv.update({ id: k, votes: v }));
	}

	onUpdateProductStatus({ target, droppedElement }) {
		if (droppedElement) {
			droppedElement.forEach(element => {
				this.featureSrv
					.updateProductStatus(element, target)
					.subscribe(() => this.cdr.detectChanges());
			});
			this.resetSelection();
		}
	}

	/**
	 * Selection bar actions
	 *
	 * Each of the actions to open dialog below will open a dialog that is itself a container.
	 */

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog(product: Product) {
		this.commonDlgSrv.openAddToProjectDialog([product]);
	}

	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product: Product) {
		this.commonDlgSrv.openExportDialog([product]);
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(product: Product) {
		this.commonDlgSrv.openRequestFeedbackDialog([product]);
	}

	/** Will show a confirm dialog to delete items selected */
	deleteSelected() {
		const items = Array.from(this.selectionSrv.selection.keys());
		// callback for confirm dialog
		const callback = () => {
			this.featureSrv.deleteMany(items).subscribe(() => {
				this.resetSelection();
			});
		};
		const text = `Delete ${items.length} ${
			items.length > 1 ? 'items' : 'item'
		} ?`;
		this.commonDlgSrv.openConfirmDialog({ text, callback });
	}

	/** Unselect all entity */
	resetSelection() {
		this.selectionSrv.unselectAll();
	}

	getSelectedProducts() {
		return Array.from(this.selectionSrv.selection.values());
	}
	onColumnSelected(products: Product[]) {
		products.forEach(prod => this.selectionSrv.selectOne(prod, true));
	}

	onColumnUnselected(products: Product[]) {
		products.forEach(prod => this.selectionSrv.unselectOne(prod, true));
	}
}
