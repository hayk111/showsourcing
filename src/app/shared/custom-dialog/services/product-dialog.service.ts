import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Product, ProductVoteRequest, Project, User } from '~models';
import { ProductService, ProjectService, TeamUserService, UserService, SupplierService } from '~global-services';
import { ProductVoteRequestService } from '~global-services/product-vote-request/product-vote-request.service';
import { Sort } from '~shared/table/components/sort.interface';
import { SelectParams } from '~global-services/_global/select-params';
import { Apollo } from 'apollo-angular';
import { ApolloStateService } from '~shared/apollo';
import { SupplierQueries } from '~global-services/supplier/supplier.queries';

@Injectable()
export class ProductDialogService extends ProductService {

	constructor(
		protected apolloState: ApolloStateService,
		protected voteSrv: ProductVoteRequestService,
		protected projectSrv: ProjectService,
		protected supplierSrv: SupplierService,
		protected teamUserSrv: TeamUserService,
		protected userSrv: UserService
	) {
		super(apolloState, userSrv);
	}

	getContacts(supplierId: string) {
		return this.supplierSrv.queryOne(supplierId, SupplierQueries.contacts);
	}

	selectProjects(): Observable<Project[]> {
		return this.projectSrv.queryMany({ sortBy: 'name' });
	}

	/**
	 * select users from current team
	 */
	selectTeamUsers() {
		return this.teamUserSrv.queryAll();
	}


	/**
	 * Associate products to projects.
	 */
	addProjectsToProducts(addedProjects: Project[], products: Product[]): Observable<Product[]> {
		return forkJoin(products.map(prod => this.addProjectsToOneProduct(addedProjects, prod)));
	}

	private addProjectsToOneProduct(addedProjects: Project[], product: Product) {
		// mapping current projects to only have the ids
		addedProjects = Array.from(addedProjects, project => ({ id: project.id }));
		const projects: Project[] = Array.from(product.projects, project => ({ id: project.id }));
		// removing duplicates
		addedProjects = addedProjects.filter(project => !projects.some(p => p.id === project.id));

		projects.push(...addedProjects);
		return this.update({ id: product.id, projects }, ['projects { id }']);
	}

	/**
	 *
	 * @param users users that we want to request feedback to
	 * @param products products we want to request feedback for
	 */
	askFeedBackToUsers(users: any[], products: Product[]) {
		// keeping only the ids so we don't send any additional data.
		// users = users.map(user => ({ id: user.id, firstName: user.firstName }));
		users = users.map(user => ({ id: user.user.id }));
		products = products.map(product => ({ id: product.id }));
		const comment = ''; // TODO: fixed this on backend side, comment must not be requis
		const requests = products.map(product => this.voteSrv.create(new ProductVoteRequest({ users, product, comment })));
		return forkJoin(requests);
	}
}
