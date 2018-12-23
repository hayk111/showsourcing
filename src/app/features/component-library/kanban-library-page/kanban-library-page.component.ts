import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService, ProductStatusService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, Product } from '~core/models';
import { KanbanColumn } from '~shared/kanban/interfaces';

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
			selectParams: { sortBy: 'category.name', descending: true },
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

		// this.columns$ = combineLatest(
		// 	productStatuses$,
		// 	products$,
		// 	statusProductToKanbanCol
		// );
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
