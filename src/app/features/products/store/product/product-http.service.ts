import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { EntityTarget, ERM } from '~app/entity/store/entity.model';
import { EntityService } from '~app/entity/store/entity.service';
import { ApiParams } from '~entity/utils';

import { Product } from './product.model';
import { UserService } from '~app/features/user/services';
import { Filter } from '~app/shared/filters';
import { UrlBuilder } from '~app/entity/utils/url-builder.class';

export interface ProductLoadingParams {
	filters?: Array<Filter>;
	recurring?: boolean;
	sortBy?: 'string';
	sortOrder?: 'asc' | 'desc';
	/** drop is for pagination */
	drop: number;
}

export interface ApiLoadingParams {
	filters?: Array<Filter>;
	sort: { sortBy: string, sortOrder: 'asc' | 'desc' };
	pagination: { drop?: number };
}

@Injectable()
export class ProductHttpService {
	repr = ERM.product;
	takeAmount = 30;

	constructor(private http: HttpClient, private entitySrv: EntityService, private userSrv: UserService) { }

	load(params: ProductLoadingParams, url?: string) {
		// first we need the filters, then we need to add the filters to the url
		params = { ...params };
		// we can pass an url for when using loadMore
		url = url || `api/team/${this.userSrv.teamId}/product?take=${this.takeAmount}&`;
		// adding filters, pagination and sorting
		url = UrlBuilder.addParams(url, params);


		return this.http.get(url).pipe(
			map((r: any) => r.elements),
			tap(products =>
				// we gonna patch the products so we have the data in the form we want (it was needed for custom fields, might not be anymore though).
				products.forEach(elem => this.linearize(elem))
			)
		);
	}

	vote(id: string, value: 0 | 100) {
		return this.http.post(`api/product/${id}/vote`, { value });
	}

	loadById(id: string) {
		const params: ApiParams = {
			target: ERM.product,
			targetId: id,
			recurring: true,
		};
		return this.entitySrv
			.load(params)
			.pipe(map(elem => this.linearize(elem)));
	}

	create(product: Product) {
		return this.http.post(`api/product`, product);
	}

	// putting properties from additional infos into the product so it's linear
	// we do this because for patching the server will want { depth: 5} instead of { additionalInfo: { depth: 5 }}
	// and we need to patch properties on the same level on the client and server.
	linearize(product: Product) {
		if (product.additionalInfo) {
			const entries = Object.entries(product.additionalInfo);
			entries.forEach(([k, v]) => {
				product[k] = v;
			});
		}
		return product;
	}

	sendPdfReq(id) {
		return this.http.get(`api/product/${id}/pdf`).pipe(map((o: any) => o.path));
	}

	requestFeedback(productId: String, recipientsIds: Array<string>) {
		const recp = { recipients: recipientsIds };
		return this.http.post(`api/product/${productId}/feedback`, recp);
	}

	addTag({ tag, productId }): Observable<any> {
		return this.http.put(`/api/product/${productId}/tag/${tag.id}`, {});
	}

	removeTag({ tag, productId }): Observable<any> {
		return this.http.delete(`/api/product/${productId}/tag/${tag.id}`, {});
	}

	createTag({ tag, productId }): Observable<any> {
		return this.http.post(`/api/team/${this.userSrv.teamId}/tag`, { name: tag.name, itemType: 'Product' });
	}

	addProject({ project, productId }): Observable<any> {
		return this.http.put(`/api/product/${productId}/project/${project.id}`, {});
	}

	removeProject({ project, productId }): Observable<any> {
		return this.http.delete(`/api/product/${productId}/project/${project.id}`, {});
	}

	createProject({ project, productId }): Observable<any> {
		return this.http.post(`/api/team/${this.userSrv.teamId}/project`, { name: project.name });
	}
}
