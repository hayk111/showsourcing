import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Product, Project, TeamUser, ProductVoteRequest, User } from '~models';

import { ProductService, ProjectService, TeamUserService } from '../../../global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { ApolloWrapper } from '~shared/apollo';
import { ProductVoteRequestService } from '~global-services/product-vote-request/product-vote-request.service';

@Injectable({
	providedIn: 'root'
})
export class ProductFeatureService extends ProductService {

	constructor(
		protected wrapper: ApolloWrapper,
		private projectSrv: ProjectService,
		private productVoteReqSrv: ProductVoteRequestService,
		private teamUserSrv: TeamUserService
	) {
		super(wrapper);
	}


	selectProjects(): Observable<Project[]> {
		const sort: Sort = { sortBy: 'name', sortOrder: 'DESC' };
		return this.projectSrv.selectMany(of(new SelectParams({ sort })));
	}

	/**
	 * @param id of the product we want to get the projects for
	 */
	selectProjectsForProduct(id: string): Observable<Project[]> {
		return this.projectSrv.selectMany(
			of(new SelectParams({ query: `products.id == "${id}"` }))
		);
	}

	selectTeamUsers() {
		return this.teamUserSrv.selectAll();
	}


	/**
	 * @param project updated project
	 */
	updateProject(project: Project): Observable<Product> {
		return this.projectSrv.update(project);
	}

	/**
	 * Associate products to projects.
	 */
	addProductsToProjects(projects: Project[], productIds: string[]): Observable<Product[]> {
		return forkJoin(projects.map(project => this.addProductsToProject(project, productIds)));
	}

	/**
	 * Associate products to a specific project. This handles duplicates into the
	 * product list to avoid adding same product ids.
	 */
	private addProductsToProject(project: Project, productIds: string[]): Observable<Product> {
		const updatedProject = {
			...project,
			products: this.getNewProductList(project.products, productIds)
		};
		return this.updateProject(updatedProject);
	}

	/**
	 * Get a list of products with unicity.
	 */
	private getNewProductList(existingProducts: Product[] = [], productIdsToAdd: string[]) {
		const existingProductIds = existingProducts.map((product => product.id));
		const newProducts = existingProductIds.concat(productIdsToAdd);
		return newProducts.map(productId => ({ id: productId }));
	}

	/**
	 *
	 * @param users users that we want to request feedback to
	 * @param products products we want to request feedback for
	 */
	askFeedBackToUsers(users: User[], products: Product[]) {
		// keeping only the ids so we don't send any additional data.
		users = users.map(user => ({ id: user.id }));
		products = products.map(product => ({ id: product.id }));
		const requests = products.map(product => this.productVoteReqSrv.create(new ProductVoteRequest({ users, product })));
		return forkJoin(requests);
	}

}
