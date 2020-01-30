import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { ApolloStateService } from '~core/apollo';
import {
	ContactService,
	ProductService,
	ProjectService,
	SupplierService,
	TeamUserService,
	UserService,
} from '~core/erm/services';
import { ProductVoteRequestService } from '~core/erm/services/product-vote-request/product-vote-request.service';
import { Contact, Product, ProductVoteRequest, Project } from '~core/erm/models';
import { AnalyticsService } from '~core/analytics/analytics.service';

@Injectable()
export class ProductDialogService extends ProductService {

	constructor(
		protected analyticsSrv: AnalyticsService,
		protected apolloState: ApolloStateService,
		protected voteSrv: ProductVoteRequestService,
		protected projectSrv: ProjectService,
		protected supplierSrv: SupplierService,
		protected teamUserSrv: TeamUserService,
		protected userSrv: UserService,
		protected contactSrv: ContactService
	) {
		super(analyticsSrv, apolloState, userSrv);
	}

	getContacts(supplierId: string): Observable<Contact[]> {
		return this.contactSrv.queryMany({ query: `supplier.id == "${supplierId}"` });
	}

	selectProjects(): Observable<Project[]> {
		return this.projectSrv.queryMany({ query: 'deleted == false', sortBy: 'name' });
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
		addedProjects = addedProjects.map(p => ({ id: p.id }));
		products = products.map(p => ({ id: p.id, projects: p.projects }));
		products.forEach(product => {
			const currentProjects = product.projects.map(p => ({ id: p.id }));
			product.projects = [...currentProjects, ...addedProjects];
		});
		return this.updateMany(products);
	}

	/**
	 * Associate products to project.
	 */
	addProductsToProject(project: Project, products: Product[]): Observable<Product[]> {
		products.forEach(product => {
			const currentProjects = product.projects.map(p => ({ id: p.id }));
			product.projects = [...currentProjects, {id: project.id}];
		});

		const mapProducts = products.map(product => ({id: product.id, projects: product.projects}));
		return this.updateMany(mapProducts);
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
