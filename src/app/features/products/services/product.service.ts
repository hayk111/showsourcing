import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { EntityService, ERM } from '~entity';
import { UserService } from '~user';
import { LoadParams } from '~app/app-root/store';

@Injectable()
export class ProductService {
	repr = ERM.product;

	constructor(
		private http: HttpClient,
		private entitySrv: EntityService,
		private userSrv: UserService
	) {}

	load(params) {
		params = { ...params };
		params.base = ERM.teams;
		params.loaded = ERM.product;
		params.recurring = true;
		return this.entitySrv
			.load(params)
			.pipe(
				map((r: any) => r.elements),
				tap(r => r.forEach(elem => this.addCustomFields(elem)))
			);
	}

	delete(id: string) {
		return this.entitySrv.delete(id, ERM.product);
	}
	vote(id: string, value: 0 | 100) {
		return this.http.post(`api/product/${id}/vote`, { value });
	}

	loadById(id: string) {
		const params: LoadParams = {
			loaded: ERM.product,
			loadedId: id,
			recurring: true,
		};
		return this.entitySrv
			.load(params)
			.pipe(map(elem => this.addCustomFields(elem)));
	}

	// properties in the customFields nested object are added to the product with
	// the property name started with x-. Ask Antoine for more info.
	addCustomFields(elem: any) {
		if (elem.additionalInfo && elem.additionalInfo.customFields) {
			const cf = elem.additionalInfo.customFields;
			Object.entries(cf).forEach(([k, v]) => (elem['x-' + k] = (v as any).value));
		}
		// this is done to have minimum order quantity on the same level
		if (elem.additionalInfo)
			elem.minimumOrderQuantity = elem.additionalInfo.minimumOrderQuantity;
		// here we do the opposite though. That's because the backend
		// is waiting for an object when we modify the price
		// amount or priceCurrency.
		if (elem.priceAmount || elem.priceCurrency)
			elem.price = {
				priceAmount: elem.priceAmount,
				priceCurrency: elem.priceCurrency,
			};
		return elem;
	}

	sendPatchRequest(p: { id: string; propName: string; value: any }) {
		let patch = { [p.propName]: p.value };
		// need to check if it's price because then we need to take the value
		// that's from product details page
		if (p.propName === 'price') patch = p.value;

		return this.http.patch(`api/product/${p.id}`, patch);
	}

	sendPdfReq(id) {
		return this.http.get(`api/product/${id}/pdf`).map((o: any) => o.path);
	}
	requestFeedback(productId: String, recipientsIds: Array<String>) {
		const recp = { recipients: recipientsIds };
		return this.http.post(`api/product/${productId}/feedback`, recp);
	}
}
