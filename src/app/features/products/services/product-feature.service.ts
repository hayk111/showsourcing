import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Product, Project } from '~models';

import { ProductService, ProjectService } from '../../../global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { GqlClient } from '~shared/apollo';

@Injectable()
export class ProductFeatureService extends ProductService {

	constructor(protected gqlClient: GqlClient, private projectSrv: ProjectService) {
		super(gqlClient);
	}


	addFile(): Observable<any> {
		throw Error('not implemented yet');
	}

	removeFile(): Observable<any> {
		throw Error('not implemented yet');
	}

	downloadFile(): Observable<any> {
		throw Error('not implemented yet');
	}

	addImage(): Observable<any> {
		throw Error('not implemented yet');
	}

	removeImage(): Observable<any> {
		throw Error('not implemented yet');
	}

	rotateImage(): Observable<any> {
		throw Error('not implemented yet');
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

}
