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

	getProjectProducts(project: Project) {
		return this.selectMany(
			of(new SelectParams({ query: `projects.id == "${project.id}"` }))
		);
	}

	getStatuses(project: Project) {
		return this.productSrv.selectMany(of(new SelectParams({ query: `projects.id == '${project.id}'` }))).pipe(
			map((products: Product[]) => products.filter(product => (!product.statuses || product.statuses.length === 0))),
			switchMap(productsWithNoStatus => {
				return this.productStatusTypeService.selectAll().pipe(
					map(statuses => statuses.filter(status => (status.category !== 'refused'))),
					switchMap(statuses => {
						return this.getProjectProducts(project).pipe(
							map(products => ({ products, statuses }))
						);
					}),
					map(({ products, statuses }) => statuses.map(status => ({
						...status,
						products: this.getProductsWithStatus(status, products)
					}))),
					map((statuses: any[]) => statuses.concat([ {
						id: -1,
						name: '_NoStatus',
						step: 0,
						products: productsWithNoStatus
					} ])),
					map(statuses => statuses.sort((s1, s2) => (s1.step - s2.step)))
				);
			})
		);
	}

	getProductsWithStatus(status: ProductStatus, products: Product[]) {
		return products.filter(product => {
			const productCurrentStatus = (product.statuses && product.statuses.length) ? product.statuses[0].status : null;
			return (productCurrentStatus && productCurrentStatus.id === status.id);
		});
	}

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
