import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Product, Project, TeamUser, ProductVoteRequest, User } from '~models';

import { ProductService, ProjectService, TeamUserService, ContactService } from '~global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { ApolloWrapper } from '~shared/apollo';
import { ProductVoteRequestService } from '~global-services/product-vote-request/product-vote-request.service';

@Injectable()
export class ProductFeatureService extends ProductService {

	constructor(
		protected wrapper: ApolloWrapper,
		private projectSrv: ProjectService,
		private productVoteReqSrv: ProductVoteRequestService,
		private teamUserSrv: TeamUserService,
		private contactSrv: ContactService
	) {
		super(wrapper);
	}


	selectProjects(): Observable<Project[]> {
		const sort: Sort = { sortBy: 'name', sortOrder: 'DESC' };
		return this.projectSrv.selectMany(of(new SelectParams({ sort })));
	}

	/**
	 * select users from current team
	 */
	selectTeamUsers() {
		return this.teamUserSrv.selectAll();
	}

	/**
	 * Associate products to projects.
	 */
	addProjectsToProducts(addedProjects: Project[], products: Product[]): Observable<Product[]> {
		return forkJoin(products.map(prod => this.addProjectsToOneProduct(addedProjects, prod)));
	}

	private addProjectsToOneProduct(addedProjects: Project[], product: Product) {
		const projects: Project[] = product.projects.map(p => ({ id: p.id }));
		projects.push(...addedProjects.map(p => ({ id: p.id })));
		return this.update({ id: product.id, projects });
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

	getContacts(supplierId: string) {
		console.log('dentro cotnat');
		return this.contactSrv.selectMany(
			of(new SelectParams({ query: `supplier.id == "${supplierId}"` }))
		);
	}

}
