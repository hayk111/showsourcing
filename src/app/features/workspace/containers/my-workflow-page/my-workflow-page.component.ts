import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ProductStatusService } from '~core/entity-services/product-status/product-status.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ProductService } from '~entity-services';
import { ERM, Product, ProductVote } from '~models';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'workspace-my-workflow-page-app',
	templateUrl: './my-workflow-page.component.html',
	styleUrls: ['./my-workflow-page.component.scss'],
	providers: [
		ListPageService
	]
})
export class MyWorkflowPageComponent extends AutoUnsub implements OnInit {
	columns$: Observable<KanbanColumn[]>;
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;

	constructor(
		private featureSrv: ProductService,
		private productStatusSrv: ProductStatusService,
		public listSrv: ListPageService<Product, ProductService>,
		public commonModalSrv: CommonModalService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.MY_WORKFLOW,
			entitySrv: this.featureSrv,
			searchedFields: ['name'],
			selectParams: { sortBy: 'name', descending: false },
			entityMetadata: ERM.PRODUCT
		});

		const products$ = this.featureSrv
			.queryMany({
				query:
					`status.id != null ` +
					`&& status.inWorkflow == true ` +
					`AND archived == false && deleted == false`,
				sortBy: 'lastUpdatedDate',
				take: 30
			}).pipe(
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
				sortBy: 'step',
				descending: false
			})
			.pipe();

		// this.columns$ = combineLatest(
		// 	productStatuses$,
		// 	products$,
		// 	statusProductToKanbanCol
		// );

		this.selected$ = this.listSrv.selection$;
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
		votes.forEach((v, k) => this.listSrv.update({ id: k, votes: v }));
	}

	onUpdateProductStatus({ target, droppedElement }) {
		if (droppedElement) {
			droppedElement.forEach(element => {
				this.featureSrv
					.update({ id: element.id, status: { id: target.id } })
					.subscribe();
			});
			this.listSrv.unselectAll();
		}
	}

	onColumnSelected(products: Product[]) {
		products.forEach(prod => this.listSrv.selectOne(prod, true));
	}

	onColumnUnselected(products: Product[]) {
		products.forEach(prod => this.listSrv.unselectOne(prod, true));
	}

}
