import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { ApolloStateService } from '~core/apollo';
import { Product, ProductStatus, Project } from '~core/models';
import { ProductService, ProductStatusService, ProjectService, UserService } from '~entity-services';
import { CloseEvent, CloseEventType } from '~shared/dialog';
import { NotificationService, NotificationType } from '~shared/notifications';

@Injectable({ providedIn: 'root' })
export class ProjectFeatureService extends ProjectService {
	constructor(
		protected apolloState: ApolloStateService,
		protected productSrv: ProductService,
		protected productStatusSrv: ProductStatusService,
		protected userSrv: UserService,
		protected notificationSrv: NotificationService,
		protected commonModalSrv: CommonModalService
	) {
		super(apolloState, userSrv);
	}

	/** Returns the products associated with a specific project */
	private getProjectProducts(project: Project) {
		return this.productSrv.queryMany({
			query: `projects.id == '${project.id}'`,
			sortBy: 'lastUpdatedDate'
		});
	}


	/**
	 * Update the status of the product with the specified one.
	 */
	updateProductStatus(product: Product, status: ProductStatus) {
		// we check if the product has a status
		return this.productSrv.update({ id: product.id, status: status.id });
	}


	/** Open the find products dialog and passing selected products to it */
	openFindProductDlg(project: Project) {
		if (project) {
			return this.getProjectProducts(project).pipe(
				first(),
				switchMap((products: Product[]) => this.commonModalSrv.openFindProductDlg(products)),
				filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
				map((evt: CloseEvent) => evt.data),
				switchMap((data: any) => this.manageProjectsToProductsAssociations([project], data))
			);
		} return of();
	}

	/**
	 * Manage products to projects relationships.
	 */
	manageProjectsToProductsAssociations(
		projects: Project[],
		{ selectedProducts, unselectedProducts }:
			{ selectedProducts?: Product[], unselectedProducts?: Product[] }
	) {
		const requests = [];

		if (selectedProducts && selectedProducts.length > 0) {
			requests.push(this.addProjectsToProducts(projects, selectedProducts));
		}
		if (unselectedProducts && unselectedProducts.length > 0) {
			requests.push(this.removeProjectsToProducts(projects, unselectedProducts));
		}

		const obs = (requests.length > 0) ? forkJoin(requests) : of();
		return obs.pipe(
			tap(_ => this.notificationSrv.add({
				type: NotificationType.SUCCESS,
				title: 'Products Updated',
				message: 'The products were updated in the project with success',
				timeout: 3500
			}))
		);
	}

	/**
	 * Associate projects to products.
	 */
	private addProjectsToProducts(addedProjects: Project[], products: Product[]): Observable<Product[]> {
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
		return this.productSrv.update({ id: product.id, projects });
	}

	/**
	 * Deassociate projects to products.
	 */
	private removeProjectsToProducts(removedProjects: Project[], products: Product[]): Observable<Product[]> {
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

		return this.productSrv.update({ id: product.id, projects });
	}
}
