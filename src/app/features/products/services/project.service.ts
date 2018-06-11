import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Product, Project } from '~models';
import { ProjectQueries } from '~features/products/services/project.queries';
import { forkJoin, from } from 'rxjs';
import { take, map, filter, first, tap } from 'rxjs/operators';
import { ApolloClient } from '~shared/apollo';

import { PER_PAGE } from '~utils/constants';

@Injectable()
export class ProjectService {
	private projectsQuery$: QueryRef<string, any>;

	constructor(private apollo: ApolloClient) { }

	/*
		Initialize the underlying query ref for the list of
		projects.
	 */
	private initializeProjectQuery() {
		if (!this.projectsQuery$) {
			this.projectsQuery$ = this.apollo.query<any>({
				query: ProjectQueries.list,
				variables: {
					query: '',
					skip: 0,
					take: PER_PAGE,
					sortBy: 'name',
					descending: true
				}
			});
		}
	}

	/*
		Initialize the underlying query ref for the list of
		projects.
	 */
	selectProjects(): Observable<Project[]> {
		this.initializeProjectQuery();
		return this.projectsQuery$.valueChanges
			.pipe(
				map(({ data, loading }) => (<any>data).projects),
		);
	}

	/**
	 *
	 * @param id of the product we want to get the projects for
	 */
	selectProjectsForProduct(id: string): Observable<Project[]> {
		return this.apollo.subscribe({
			query: ProjectQueries.listForProduct,
			variables: {
				query: `products.id == "${id}"`
			}
		}).pipe(
			map((r: any) => r.data.projects)
		);
	}


	/**
	 *
	 * @param project updated project
	 */
	updateProject(project: Project): Observable<Product> {
		return this.apollo.update({ mutation: ProjectQueries.updateProject, input: project, typename: 'Project' }).pipe(first());
	}

	/*
        Associate products to projects.
     */
	addProductsToProjects(projects: Project[], productIds: string[]): Observable<Product[]> {
		// TODO: batching should be used here to execute mutations
		return forkJoin(projects.map(project => this.addProductsToProject(project, productIds)));
	}

	/*
        Associate products to a specific project. This handles duplicates into the
        product list to avoid adding same product ids.
     */
	addProductsToProject(project: Project, productIds: string[]): Observable<Product> {
		const updatedProject = {
			...project,
			products: this.getNewProductList(project.products, productIds)
		};
		return this.updateProject(updatedProject);
	}

	/*
        Get a list of products with unicity.
    */
	getNewProductList(existingProducts: Product[], productIdsToAdd: string[]) {
		const existingProductIds = existingProducts.map((product => product.id));
		let newProducts = existingProductIds.concat(productIdsToAdd);
		newProducts = [...new Set(newProducts)];
		return newProducts.map(productId => ({ id: productId }));
	}
}
