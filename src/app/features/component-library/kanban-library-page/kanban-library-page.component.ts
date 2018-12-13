import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductStatusService, ProductService } from '~core/entity-services';
import { ProductQueries } from '~core/entity-services/product/product.queries';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { statusProductToKanbanCol } from '~utils/kanban.utils';
import { KanbanColumn } from '~shared/kanban/interfaces';
import { ListPageService, ListPageKey } from '~core/list-page';
import { ERM, Product } from '~core/models';

@Component({
	selector: 'kanban-library-page-app',
	templateUrl: './kanban-library-page.component.html',
	styleUrls: ['./kanban-library-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanLibraryPageComponent implements OnInit {

	columns$: Observable<KanbanColumn[]>;
	constructor(
		private productSrv: ProductService,
		private productStatusSrv: ProductStatusService,
		public listSrv: ListPageService<any, any>
	) { }

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.LIB_KANBAN,
			entitySrv: this.productSrv,
			searchedFields: ['name', 'supplier.name', 'category.name'],
			currentSort: { sortBy: 'category.name', descending: true },
			entityMetadata: ERM.PRODUCT
		});


		const products$ = this.productSrv.queryMany({
			sortBy: 'lastUpdatedDate',
			take: 30
		}).pipe(
			// first(),
			// we lose the order when the product is updated
			// because apollo has no idea of how to reorder items unless we do
			// a refetch, but we re gonna do it on the front end
			map(products => products.sort(
				(a, b) => +(new Date(b.lastUpdatedDate)) - (+new Date(a.lastUpdatedDate)))
			)
		);

		const productStatuses$ = this.productStatusSrv
			.queryAll(undefined, {
				query: 'category != "refused" AND category != "inspiration"',
				sortBy: 'step',
				descending: false
			}).pipe();

		this.columns$ = combineLatest(
			productStatuses$,
			products$,
			statusProductToKanbanCol
		);
	}

	updateProductStatus(product: Product) {
		// TODO implement this function
		throw 'not implemented updateProductStatus';
	}


	updateProductsStatus(products: Product[]) {
		// TODO implement this function
		throw 'not implemented updateProductsStatus';
	}

	onColumnSelected(data: any) {
		// TODO implement this function
		throw 'not implemented onColumnSelected';
	}

	onColumnUnselected(data: any) {
		// TODO implement this function
		throw 'not implemented onColumnUnselected';
	}
}
