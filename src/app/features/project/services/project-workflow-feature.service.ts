import { Injectable } from '@angular/core';
import { ProductService, ProductStatusTypeService, UserService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo';
import { Observable } from 'rxjs';
import { SelectParams } from '~global-services/_global/select-params';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Project, Product, ProductStatus, ProductStatusType } from '~models';

@Injectable({
	providedIn: 'root'
})
export class ProjectWorkflowFeatureService extends ProductService {
	constructor(
		protected wrapper: ApolloWrapper,
		protected productSrv: ProductService,
		protected productStatusTypeService: ProductStatusTypeService,
		protected userSrv: UserService
	) {
		super(wrapper, userSrv);
	}

	/** Returns the products associated with a specific project */
	getProjectProducts(project: Project) {
		return this.selectMany({ query: `projects.id == "${project.id}"` });
	}

	/**
	 * Returns the product statuses including the associated products.
	 *
	 * The status with the category refused is removed since we don't need
	 * to display it.
	 *
	 * A fake status is added with the products with no status since they
	 * also have to be display in the kanban.
	 * */
	getStatuses(project: Project) {
		return this.productSrv.queryMany({ query: `projects.id == '${project.id}'` }).pipe(
			// Filter products to get only products without status
			map((products: Product[]) => products.filter(product => (!product.statuses || product.statuses.length === 0))),
			switchMap(productsWithNoStatus => {
				return this.productStatusTypeService.selectAll().pipe(
					// Remove the status with category refused
					map(statuses => statuses.filter(status => (status.category !== 'refused'))),
					// Load products associated with the project
					switchMap(statuses => {
						return this.getProjectProducts(project).pipe(
							map(products => ({ products, statuses }))
						);
					}),
					// Add products to the status
					map(({ products, statuses }) => statuses.map(status => ({
						...status,
						products: this.getProductsWithStatus(status, products)
					}))),
					// Add fake status for products without status
					map((statuses: any[]) => statuses.concat([{
						id: -1,
						name: '_NoStatus',
						step: 0,
						products: productsWithNoStatus
					}])),
					// Sort statuses per step
					map(statuses => statuses.sort((s1, s2) => (s1.step - s2.step)))
				);
			})
		);
	}

	/**
	 * Filter the products list to get only products that have a current status
	 * and correspond to the provided status.
	 */
	getProductsWithStatus(status: ProductStatus, products: Product[]) {
		return products.filter(product => {
			const productCurrentStatus = (product.statuses && product.statuses.length) ? product.statuses[0].status : null;
			return (productCurrentStatus && productCurrentStatus.id === status.id);
		});
	}

	/**
	 * Update the status of the product with the specified one.
	 */
	updateProductStatus(product: Product, status: ProductStatus) {
		// we check if the product has a status
		if (!product.statuses || product.statuses.length === 0) {
			const tempS = new ProductStatus({ status: { id: status.id } });
			return this.update({ ...product, statuses: [tempS] });
		} else {
			// we dont update if we click the same status as the current one of the product
			if (status.id !== product.statuses[0].status.id) {
				const tempS = new ProductStatus({ status: { id: status.id } });
				return this.update({ ...product, statuses: [tempS, ...product.statuses] });
			}
		}
		return of();
	}

}
