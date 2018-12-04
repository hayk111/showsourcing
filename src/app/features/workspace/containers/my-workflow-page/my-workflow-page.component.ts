import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { ProductService, ProductStatusTypeService } from '~entity-services';
import { ProductQueries } from '~entity-services/product/product.queries';
import { Product, ProductVote } from '~models';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { statusProductToKanbanCol } from '~utils/kanban.utils';

@Component({
	selector: 'workspace-my-workflow-page-app',
	templateUrl: './my-workflow-page.component.html',
	styleUrls: ['./my-workflow-page.component.scss'],
	providers: [
		ListPageDataService,
		ListPageViewService,
		SelectionWithFavoriteService,
		CommonDialogService
	]
})
export class MyWorkflowPageComponent extends AutoUnsub implements OnInit {
	columns$: Observable<KanbanColumn[]>;
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;

	constructor(
		public router: Router,
		public featureSrv: ProductService,
		public productStatusSrv: ProductStatusTypeService,
		public cdr: ChangeDetectorRef,
		public thumbSrv: ThumbService,
		public viewSrv: ListPageViewService<Product>,
		public dataSrv: ListPageDataService<Product, ProductService>,
		public selectionSrv: SelectionWithFavoriteService,
		public commonDlgSrv: CommonDialogService
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
			this.selectionSrv.unselectAll();
		}
	}

	onColumnSelected(products: Product[]) {
		products.forEach(prod => this.selectionSrv.selectOne(prod, true));
	}

	onColumnUnselected(products: Product[]) {
		products.forEach(prod => this.selectionSrv.unselectOne(prod, true));
	}

}
