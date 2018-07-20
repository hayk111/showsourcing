import { Injectable } from '@angular/core';
import { ProductService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo';
import { Observable } from 'rxjs';
import { SelectParams } from '~global-services/_global/select-params';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ERMService } from '~global-services/_global/erm.service';
import { Project, ERM, Product, ProductStatus } from '~models';

@Injectable({
	providedIn: 'root'
})
export class ProjectWorkflowFeatureService extends ProductService {
	constructor(
		protected wrapper: ApolloWrapper,
		protected productSrv: ProductService,
		protected ermSrv: ERMService
	) {
		super(wrapper);
	}

	getProjectProducts(project: Project) {
		return this.selectMany(
			of(new SelectParams({ query: `projects.id == "${project.id}"` }))
		);
	}

	getStatuses(project: Project) {
		return this.ermSrv.getStatusService(ERM.PRODUCT).selectAll('id, name, color, contrastColor, step').pipe(
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
		console.log('>> products = ', products);
		return products.filter(product => {
			const productCurrentStatus = product.statuses ? product.statuses[0].status : null;
			return (productCurrentStatus && productCurrentStatus.id === status.id);
		});
	}
}
