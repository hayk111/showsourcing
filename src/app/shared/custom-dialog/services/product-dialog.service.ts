import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Product, ProductVoteRequest, Project, User } from '~models';
import { ProductService, ProjectService, TeamUserService, UserService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo';
import { ProductVoteRequestService } from '~global-services/product-vote-request/product-vote-request.service';
import { Sort } from '~shared/table/components/sort.interface';
import { SelectParams } from '~global-services/_global/select-params';

@Injectable()
export class ProductDialogService extends ProductService {

	constructor(
		protected apollo: Apollo
		protected voteSrv: ProductVoteRequestService,
		protected projectSrv: ProjectService,
		protected teamUserSrv: TeamUserService,
		protected userSrv: UserService
	) {
		super(wrapper, userSrv);
	}

	selectProjects(): Observable<Project[]> {
		const sort: Sort = { sortBy: 'name', sortOrder: 'DESC' };
		return this.projectSrv.queryMany({ sort });
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
		const requests = products.map(product => this.voteSrv.create(new ProductVoteRequest({ users, product })));
		return forkJoin(requests);
	}
}
