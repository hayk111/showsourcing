import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComment } from '../../store/model/comment.model';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { entityRepresentationMap, FilterGroupName } from '../../store/model/filter.model';
import { TeamItemLoaderService } from './team-item-loader.service';

@Injectable()
export class ProductService {
	repr = entityRepresentationMap.product;

	constructor(private http: HttpClient,
							private teamItemLoader: TeamItemLoaderService) { }

	load(filterGroupName: FilterGroupName) {
		return this.teamItemLoader.load(this.repr, filterGroupName)
			.map(r => r.elements)
			.map(elems => this.addCustomFields(elems));
	}

	// properties in the customFields nested object are added to the product with
	// the property name started with x-. Ask Antoine for more info.
	addCustomFields(elems: Array<any>) {
		elems.forEach(elem => {
			if (elem.additionalInfo && elem.additionalInfo.customFields) {
				const cf = elem.additionalInfo.customFields;
				Object.entries(cf).forEach(([k, v]) => elem['x-' + k] = v.value);
			}
			// this is done to have minimum order quantity on the same level
			if (elem.additionalInfo)
				elem.minimumOrderQuantity = elem.additionalInfo.minimumOrderQuantity;
			// here we do the opposite though. That's because the backend is waiting for an object when we modify the price
			// amount or priceCurrency.
			if (elem.priceAmount || elem.priceCurrency)
				elem.price = { priceAmount: elem.priceAmount, priceCurrency: elem.priceCurrency };
		});
		return elems;
	}

	sendPatchRequest(p: { id: string, propName: string, value: any }) {
		let patch = { [p.propName]: p.value };
		// check for customFields
		if (p.propName.startsWith('x-')) {
			const propName = p.propName.substr(2);
			patch = { customFields : { [propName]: { value : p.value} }};
		}
		// need to check if it's price because it's handled this way @ backend
		if (p.propName === 'priceAmount')
			patch = p.value;
		return this.http.patch(`api/product/${p.id}`, patch);
	}

	deepLoad(id: string) {
		return forkJoin([
			this.sendImgReq(id),
			this.sendAttachmentReq(id),
			this.sendCommentReq(id),
			this.sendVoteReq(id),
			this.sendTagReq(id)
		]);
	}

	sendImgReq(id: string) {
		return this.http.get(`api/product/${id}/image`).map(images => ({images}) );
	}

	sendAttachmentReq(id: string) {
		return this.http.get(`api/product/${id}/attachment`).map(attachments => ({attachments}) );
	}

	sendCommentReq(id: string) {
		return this.http.get(`api/product/${id}/comment`).map(comments => ({ comments }) );
	}

	sendVoteReq(id: string) {
		return this.http.get(`api/product/${id}/vote`).map(votes => ({ votes }));
	}

	sendTagReq(id: string) {
		return this.http.get(`api/product/${id}/tag`).map(tags => ({ tags }) );
	}

	// TODO remove those
	postVote(v: { productId: string, value: number }) {
		return this.http.post(`api/product/${v.productId}/vote`, { value : v.value});
	}

	postComment(comment: AppComment) {
		return this.http.post(`api/product/${comment.productId}/comment`, { text: comment.text });
	}

}
