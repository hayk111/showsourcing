import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { first, map, takeUntil, tap } from 'rxjs/operators';
import { ProductService, ProductStatusService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { ERM, Product, ProductStatus } from '~core/models';
import { FilterList } from '~shared/filters';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'kanban-page-app',
	templateUrl: './kanban-page.component.html',
	styleUrls: ['./kanban-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		KanbanService,
		ListPageService
	]
})
export class KanbanPageComponent extends AutoUnsub implements OnInit {

	columns$ = this.kanbanSrv.columns$;
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;

	constructor(
		private productSrv: ProductService,
		private productStatusSrv: ProductStatusService,
		public kanbanSrv: KanbanService,
		public listSrv: ListPageService<any, any>
	) { super(); }

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.productSrv,
			searchedFields: ['name', 'supplier.name', 'category.name'],
			selectParams: { sortBy: 'category.name', descending: true, query: 'deleted == false' },
			entityMetadata: ERM.PRODUCT
		});

		const filters$ = this.listSrv.filterList.valueChanges$.pipe(
			takeUntil(this._destroy$)
		);

		const statuses$ = this.productStatusSrv
			.queryAll(undefined, {
				query: 'category != "refused"',
				sortBy: 'step',
				descending: false
			}).pipe(
				first(),
				// adding new status
				map(statuses => [{ id: null, name: 'New Product', category: 'new' }, ...statuses]),
				tap(statuses => this.kanbanSrv.setColumnsFromStatus(statuses)),
			);

		combineLatest(
			filters$,
			statuses$,
			(filterList, statuses) => this.getProducts(statuses, filterList)
		).subscribe();
		this.selected$ = this.listSrv.selection$;
	}

	private getProducts(statuses: ProductStatus[], filterList: FilterList) {
		const predicate = filterList.asPredicate();
		statuses.forEach(status => {
			const constQuery = status.id !== null ?
				`status.id == "${status.id}"`
				: `status == null`;

			const query = [
				predicate,
				constQuery
			].join(' && ');
			this.productSrv.queryMany({ query, take: 6, sortBy: 'lastUpdatedDate' })
				.pipe(first())
				.subscribe(prods => this.kanbanSrv.setData(prods, status.id));
			this.productSrv.queryCount(query).pipe(first())
				.subscribe(total => this.kanbanSrv.setTotal(total, status.id));
		});
	}

	updateProductStatus(product: Product) {
		// TODO implement this function
		throw new Error('not implemented updateProductStatus');
	}


	updateProductsStatus(products: Product[]) {
		// TODO implement this function
		throw new Error('not implemented updateProductsStatus');
	}

	onColumnSelected(data: any) {
		// TODO implement this function
		throw new Error('not implemented onColumnSelected');
	}

	onColumnUnselected(data: any) {
		// TODO implement this function
		throw new Error('not implemented onColumnUnselected');
	}
}
