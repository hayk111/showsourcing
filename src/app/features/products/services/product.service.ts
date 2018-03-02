import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { entityRepresentationMap } from '~entity';

@Injectable()
export class ProductService {
	repr = entityRepresentationMap.product;
	// how many items we take in one go (pagination)
	take = 100;
	// how many items are dropped
	drop = 0;

	constructor(private http: HttpClient) {}

	load({ id, maxCounter }) {
		return this.http
			.get(`api/team/${id}/product?sort=category&sortOrder=ASC&take=${this.take}&drop=${this.drop}`)
			.pipe(map((r: any) => r.elements), tap(r => r.forEach(elem => this.addCustomFields(elem))));
	}

	private getProducts(drop, teamId) {
		return this.http.get(
			`api/team/${teamId}/product?sort=category&sortOrder=ASC&take=${this.take}&drop=${drop}&withArchived=false`
		);
	}

	loadById(id: string) {
		return this.http.get(`api/product/${id}`).map(elem => this.addCustomFields(elem));
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
		// here we do the opposite though. That's because the backend
		// is waiting for an object when we modify the price
		// amount or priceCurrency.
		if (elem.priceAmount || elem.priceCurrency)
			elem.price = { priceAmount: elem.priceAmount, priceCurrency: elem.priceCurrency };
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
}
