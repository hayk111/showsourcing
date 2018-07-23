import { Injectable } from '@angular/core';
import { ProductService, ProductStatusTypeService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo';
import { Observable } from 'rxjs';
import { SelectParams } from '~global-services/_global/select-params';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Project, Product, ProductStatus } from '~models';

@Injectable({
	providedIn: 'root'
})
export class ProjectWorkflowFeatureService extends ProductService {
	constructor(
		protected wrapper: ApolloWrapper,
		protected productSrv: ProductService,
		protected productStatusTypeService: ProductStatusTypeService
	) {
		super(wrapper);
	}

	getProjectProducts(project: Project) {
		return this.selectMany(
			of(new SelectParams({ query: `projects.id == "${project.id}"` }))
		);
	}

	getStatuses(project: Project) {
		return this.productStatusTypeService.selectAll().pipe(
			switchMap(statuses => {
				return this.getProjectProducts(project).pipe(
					map(products => ({ products, statuses }))
				);
			}),
			map(({ products, statuses }) => statuses.map(status => ({
				...status,
				products: this.getProductsWithStatus(status, products)
			})))
		);
	}

	getProductsWithStatus(status: ProductStatus, products: Product[]) {
		return products.filter(product => {
			const productCurrentStatus = product.statuses ? product.statuses[0].status : null;
			return (productCurrentStatus && productCurrentStatus.id === status.id);
		});
	}

	updateProductStatus(product: Product, status: ProductStatus) {
		console.log('>> updateProductStatus - product = ', product, ' - status = ', status);
		if (status.id !== product.statuses[0].status.id) { // we dont update if we click the same
			const tempS = new ProductStatus({ status: { id: status.id } });
			return this.update({ ...product, statuses: [tempS, ...product.statuses] });
		}
		return of();
	}

}
