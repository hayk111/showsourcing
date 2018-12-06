import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo';
import { ProductService, ProductStatusService, UserService } from '~entity-services';
import { ListQuery } from '~entity-services/_global/list-query.interface';
import { Product, ProductStatus } from '~models';
import { Sort } from '~shared/table/components/sort.interface';


@Injectable({
	providedIn: 'root'
})
export class WorkspaceFeatureService extends ProductService {
	productsResult: ListQuery<Product>;
	allProductsResult: ListQuery<Product>;

	constructor(
		protected apolloState: ApolloStateService,
		protected productSrv: ProductService,
		protected productStatusSrv: ProductStatusService,
		protected userSrv: UserService
	) {
		super(apolloState, userSrv);
	}

	getFirstStatus() {
		return this.productStatusSrv.queryAll('', { query: 'inWorkflow == true', sortBy: 'step' }).pipe(
			first(),
			map(status => status[0]) // we only need the first
		);
	}

	/** Set the first status of the workflow on the product */
	sendProductToWorkflow(product: Product) {
		return this.getFirstStatus().pipe(
			switchMap(status => {
				return this.updateProductStatus(product, status);
			})
		);
	}

	/**
	 * Update the status of the product with the specified one.
	 */
	updateProductStatus(product: Product, status: ProductStatus) {
		// we check if the product has a status
		if (status !== undefined) {
			return this.update({ id: product.id, status: { id: status } });
		}
		return of();
	}

}
