import { Injectable } from '@angular/core';
import { ProductService, ProductStatusTypeService, UserService } from '~global-services';
import { ProductStatusService } from '~global-services/product-status/product-status.service';
import { ProductQueries } from '~global-services/product/product.queries';
import { Observable } from 'rxjs';
import { SelectParams } from '~global-services/_global/select-params';
import { of, forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Project, Product, ProductStatus, ProductStatusType } from '~models';
import { Apollo } from 'apollo-angular';
import { ListQuery } from '~global-services/_global/list-query.interface';
import { ApolloStateService } from '~shared/apollo';
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
					`status.id != null && name CONTAINS[c] "${search}"` :
					`status.id != null`,
				sortBy: 'lastUpdatedDate'
			});
		}

		if (!this.productsResult) {
			this.productsResult = this.productSrv.getListQuery({
				query: search ?
					`status.id != null && name CONTAINS[c] "${search}"` :
					`status.id != null`,
				sortBy: 'lastUpdatedDate'
			});
		}
		return this.productsResult.items$.pipe(
			switchMap(products => {
				return this.productStatusTypeService.queryAll().pipe(
					// Remove the status with category refused
					map(statuses => statuses.filter(status => (status.category !== 'refused' && status.category !== 'inspiration'))),
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

	/** Get the list of products */
	getProducts(sort: Sort, refresh = false) {
		if (refresh && this.allProductsResult) {
			this.allProductsResult.refetch({
				sortBy: sort ? sort.sortBy : null
			});
		}

		if (!this.allProductsResult) {
			this.allProductsResult = this.productSrv.getListQuery({
				sortBy: sort ? sort.sortBy : null
			});
		}

		return this.allProductsResult.items$;
	}

	/**
	 * Filter the products list to get only products that have a current status
	 * and correspond to the provided status.
	 */
	getProductsWithStatus(status: ProductStatus, products: Product[]) {
		return products.filter(product => {
			const productCurrentStatus = product.status ? product.status.status : null;
			return (productCurrentStatus && productCurrentStatus.id === status.id);
		});
	}

	/**
	 * Update the status of the product with the specified one.
	 */
	updateProductStatus(product: Product, statusType: ProductStatusType) {
		// we check if the product has a status
		if (!product.status) {
			const tempStatus = new ProductStatus({ status: { id: statusType.id } }) as any;
			return this.update({ id: product.id, status: tempStatus }, [ProductQueries.status]);
		} else {
			// we dont update if we click the same status as the current one of the product
			const productStatusType = product.status.status;
			if (statusType.id !== productStatusType.id) {
				const tempStatus = new ProductStatus({ status: { id: statusType.id } }) as any;
				return this.update({ id: product.id, status: tempStatus }, [ProductQueries.status]);
			}
		}
		return of();
	}

}
