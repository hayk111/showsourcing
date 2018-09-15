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


@Injectable({
	providedIn: 'root'
})
export class ProjectWorkflowFeatureService extends ProductService {
	productsResult: ListQuery<Product>;

	constructor(
		protected apolloState: ApolloStateService,
		protected productSrv: ProductService,
		protected productStatusSrv: ProductStatusService,
		protected productStatusTypeService: ProductStatusTypeService,
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
	 * Returns the product statuses including the associated products.
	 *
	 * The status with the category refused is removed since we don't need
	 * to display it.
	 *
	 * A fake status is added with the products with no status since they
	 * also have to be display in the kanban.
	 */
	getStatuses(project: Project, refresh = false) {
		if (refresh && this.productsResult) {
			this.productsResult.refetch({
				query: `projects.id == '${project.id}'`,
				sortBy: 'lastUpdatedDate'
			});
		}

		if (!this.productsResult) {
			this.productsResult = this.productSrv.getListQuery({ query: `projects.id == '${project.id}'`, sortBy: 'lastUpdatedDate' });
		}
		return this.productsResult.items$.pipe(
			// Filter products to get only products without status
			map((products: Product[]) => products.filter(product => !product.status)),
			switchMap(productsWithNoStatus => {
				return this.productStatusTypeService.queryAll().pipe(
					// Remove the status with category refused
					map(statuses => statuses.filter(status => (status.category !== 'refused' && status.category !== 'inspiration'))),
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
		return this.update({ id: product.id, projects }, ['projects { id }']);
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

		return this.update({ id: (typeof product.id === 'undefined' ? product : product.id), projects }, ['projects { id }']);
	}

}
