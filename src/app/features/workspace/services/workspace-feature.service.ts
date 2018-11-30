import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo';
import { ProductService, ProductStatusTypeService, UserService } from '~entity-services';
import { ListQuery } from '~entity-services/_global/list-query.interface';
import { ProductStatusService } from '~entity-services/product-status/product-status.service';
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
		protected productStatusTypeService: ProductStatusTypeService,
		protected userSrv: UserService
	) {
		super(apolloState, userSrv);
	}

	/**
	 * Returns the product statuses including the associated products.
	 *
	 * The status with the category refused is removed since we don't need
	 * to display it.
	 * */
	getStatuses(refresh = false, search?: string) {
		if (refresh && this.productsResult) {
			this.productsResult.refetch({
				query: search ?
					`status.id != null` +
					`&& status.inWorkflow == true ` +
					`&& name CONTAINS[c] "${search}" AND archived == false && deleted == false` :
					`status.id != null ` +
					`&& status.inWorkflow == true ` +
					`AND archived == false && deleted == false`,
				sortBy: 'lastUpdatedDate',
				take: 100 // TODO this has to change to a queryAll, but easiest way to change it was like this
			}).subscribe();
		}

		if (!this.productsResult) {
			this.productsResult = this.productSrv.getListQuery({
				query: search ? // we get all the products with status and inWorkflow
					`status.id != null ` +
					`&& status.inWorkflow == true ` +
					`&& name CONTAINS[c] "${search}" AND archived == false && deleted == false` :
					`(status.id != null) ` +
					`&& status.inWorkflow == true ` +
					`AND archived == false && deleted == false`,
				sortBy: 'lastUpdatedDate',
				take: 15 // TODO this has to change to a queryAll
			});
		}
		return this.productsResult.items$.pipe(
			switchMap(products => {
				return this.productStatusTypeService.queryAll().pipe(
					// Only get status that are in workflow or is validated
					// This way we have the validated column to drag and drop the products we want to validate
					// Do not confuse this query with the one above, where we filter only inWorkflow products
					map(statuses => statuses.filter(status => (status.inWorkflow || status.category === 'validated'))),
					map(statuses => ({ statuses, products }))
				);
			}),
			// Add products to the status
			map(({ products, statuses }) => statuses.map(status => ({
				...status,
				products: this.getProductsWithStatus(status, products)
			}))),
			// Sort statuses per step
			map(statuses => statuses.sort((s1, s2) => (s1.step - s2.step)))
		);
	}

	getFirstStatus() {
		return this.productStatusTypeService.queryAll('', { query: 'inWorkflow == true', sortBy: 'step' }).pipe(
			first(),
			map(status => status[0] ? status[0] : null) // we only need the first
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

	/** Get the list of products */
	getProducts(sort: Sort, search: string, refresh = false) {
		const params = search ? {
			query: `status.id == null && status.inWorkflow == true ` +
				`&& name CONTAINS[c] "${search}" AND archived == false && deleted == false`,
			sortBy: sort ? sort.sortBy : null
		} : {
				query: `status.id == null ` +
					`&& status.inWorkflow == true ` +
					`AND archived == false && deleted == false`,
				sortBy: sort ? sort.sortBy : null
			};

		if (refresh && this.allProductsResult) {
			this.allProductsResult.refetch(params);
		}

		if (!this.allProductsResult) {
			this.allProductsResult = this.productSrv.getListQuery(params);
		}

		return this.allProductsResult.items$;
	}

	/**
	 * Filter the products list to get only products that have a current status
	 * and correspond to the provided status.
	 */
	getProductsWithStatus(status: ProductStatus, products: Product[]) {
		return products.filter(product => {
			const productCurrentStatus = product.status;
			return (productCurrentStatus && productCurrentStatus.id === status.id);
		});
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
