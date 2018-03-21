import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { EntityService, ERM } from '~entity';
import { UserService } from '~user';
import { ApiParams, Patch } from '~entity/utils';
import { Product } from '~app/features/products';
import { Tag } from '~app/app-root/store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {
	repr = ERM.product;

	constructor(private http: HttpClient, private entitySrv: EntityService, private userSrv: UserService) {}

	load(params) {
		params = { ...params };
		params.base = ERM.teams;
		params.target = ERM.product;
		params.recurring = true;
		return this.entitySrv.load(params).pipe(
			map((r: any) => r.elements),
			tap(products =>
				products.forEach(elem => {
					this.addCustomFields(elem);
					this.linearize(elem);
				})
			)
		);
	}

	delete(id: string) {
		return this.entitySrv.delete(id, ERM.product);
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
			.pipe(map(elem => this.addCustomFields(elem)), map(elem => this.linearize(elem)));
	}

	// properties in the customFields nested object are added to the product with
	// the property name started with x-. Ask Antoine for more info.
	addCustomFields(elem: any) {
		if (elem.additionalInfo && elem.additionalInfo.customFields) {
			const cf = elem.additionalInfo.customFields;
			Object.entries(cf).forEach(([k, v]) => (elem['x-' + k] = (v as any).value));
		}
		// this is done to have minimum order quantity on the same level
		if (elem.additionalInfo) elem.minimumOrderQuantity = elem.additionalInfo.minimumOrderQuantity;
		return elem;
	}

	// putting properties from additional infos into the product so it's linear
	linearize(product: Product) {
		if (product.additionalInfo) {
			const entries = Object.entries(product.additionalInfo);
			entries.forEach(([k, v]) => {
				product[k] = v;
			});
		}
		return product;
	}

	sendPatchRequest(p: Patch) {
		const patch = { [p.propName]: p.value };
		return this.http.patch(`api/product/${p.id}`, patch);
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
		debugger;
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
