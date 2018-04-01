import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, tap } from 'rxjs/operators';
import { EntityTarget, ERM } from '~app/entity/store/entity.model';
import { EntityService } from '~app/entity/store/entity.service';
import { ApiParams } from '~entity/utils';

import { Product } from './product.model';
import { UserService } from '~app/features/user/services';

@Injectable()
export class ProductHttpService {
	repr = ERM.product;

	constructor(private http: HttpClient, private entitySrv: EntityService, private userSrv: UserService) { }

	load(params) {
		params = { ...params };
		params.base = ERM.team;
		params.target = ERM.product;
		params.recurring = true;
		return this.entitySrv.load(params).pipe(
			map((r: any) => r.elements),
			tap(products =>
				products.forEach(elem => this.linearize(elem))
			)
		);
	}

	loadLatestForTarget(target: EntityTarget) {
		const params = `drop=0&take=8&sort=creationDate&sortOrder=DESC&${target.entityRepr.urlName}=${target.entityId}`;
		return this.userSrv.user$.pipe(
			switchMap(user => this.http.get(`api/team/${this.userSrv.teamId}/product?${params}`)),
			map((r: any) => r.elements)
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
		return this.http.get(`api/product/${id}/pdf`).map((o: any) => o.path);
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