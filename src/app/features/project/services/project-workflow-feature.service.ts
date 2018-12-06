import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo';
import { ProductService, UserService } from '~entity-services';
import { ListQuery } from '~entity-services/_global/list-query.interface';
import { ProductStatusService } from '~entity-services/product-status/product-status.service';
import { Product, Project, ProductStatus } from '~models';


@Injectable({
	providedIn: 'root'
})
export class ProjectWorkflowFeatureService extends ProductService {
	productsResult: ListQuery<Product>;

	constructor(
		protected apolloState: ApolloStateService,
		protected productSrv: ProductService,
		protected productStatusSrv: ProductStatusService,
		protected productStatusService: ProductStatus,
		protected userSrv: UserService
	) {
		super(apolloState, userSrv);
	}

	/** Returns the products associated with a specific project */
	getProjectProducts(project: Project, refresh = false) {
		if (refresh && this.productsResult) {
			this.productsResult.refetch({
				query: `projects.id == '${project.id}'`,
				sortBy: 'lastUpdatedDate'
			});
		}

		if (!this.productsResult) {
			this.productsResult = this.productSrv.getListQuery({ query: `projects.id == '${project.id}'`, sortBy: 'lastUpdatedDate' });
		}
		return this.productsResult.items$;
	}

	/** Refetch the statuses */
	refreshStatuses(project: Project) {
		if (this.productsResult) {
			this.productsResult.refetch({
				query: `projects.id == '${project.id}'`,
				sortBy: 'lastUpdatedDate'
			}).subscribe();
		}
	}


	/**
	 * Update the status of the product with the specified one.
	 */
	updateProductStatus(product: Product, status: ProductStatus) {
		// we check if the product has a status
		return this.productSrv.update({ id: product.id, status: status.id });
	}

	/**
	 * Manage products to projects relationships.
	 */
	manageProjectsToProductsAssociations(projects: Project[], selectedProducts: Product[], unselectedProducts: Product[]) {
		const requests = [];

		if (selectedProducts && selectedProducts.length > 0) {
			requests.push(this.addProjectsToProducts(projects, selectedProducts));
		}
		if (unselectedProducts && unselectedProducts.length > 0) {
			requests.push(this.removeProjectsToProducts(projects, unselectedProducts));
		}

		return (requests.length > 0) ? forkJoin(requests) : of();
	}

	/**
	 * Associate projects to products.
	 */
	addProjectsToProducts(addedProjects: Project[], products: Product[]): Observable<Product[]> {
		return forkJoin(products.map(prod => this.addProjectsToOneProduct(addedProjects, prod)));
	}

	/**
	 * Associate projects for one product.
	 */
	private addProjectsToOneProduct(addedProjects: Project[], product: Product) {
		// mapping current projects to only have the ids
		addedProjects = Array.from(addedProjects, project => ({ id: project.id }));
		const projects: Project[] = Array.from(product.projects ? product.projects : [], project => ({ id: project.id }));
		// removing duplicates
		addedProjects = addedProjects.filter(project => !projects.some(p => p.id === project.id));

		projects.push(...addedProjects);
		return this.update({ id: product.id, projects });
	}

	/**
	 * Deassociate projects to products.
	 */
	removeProjectsToProducts(removedProjects: Project[], products: Product[]): Observable<Product[]> {
		return forkJoin(products.map(prod => this.removeProjectsToOneProduct(removedProjects, prod)));
	}

	/**
	 * Deassociate projects for one product.
	 */
	private removeProjectsToOneProduct(removedProjects: Project[], product: Product) {
		// mapping current projects to only have the ids
		removedProjects = Array.from(removedProjects, project => ({ id: project.id }));
		let projects: Project[] = Array.from(product.projects ? product.projects : [], project => ({ id: project.id }));
		// removing
		projects = projects.filter(project => !removedProjects.some(p => p.id === project.id));

		return this.update({ id: (typeof product.id === 'undefined' ? product : product.id), projects });
	}

}
