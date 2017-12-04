import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { ActionType, ProductActions } from '../action/product.action';
import { TypedAction } from '../utils/typed-action.interface';
import { switchMap, map, merge, mergeMap } from 'rxjs/operators';
import { zip } from 'rxjs/observable/zip';
import { forkJoin } from 'rxjs/observable/forkJoin';


@Injectable()
export class ProductEffects {

	// // Listen for the patch action
	@Effect({ dispatch: false })
	patch$ = this.actions$.ofType(ActionType.PATCH_PROPERTY)
		.map((action: TypedAction<any>) => action.payload)
		.pipe(
			switchMap(p => this.sendPatchRequest(p))
		);

	@Effect()
	deepLoad$ = this.actions$.ofType<any>(ActionType.DEEP_LOAD_REQ).pipe(
		map(action => action.payload),
		switchMap(
			id => this.deepLoad(id),
			(id, result) => {
				// transform {key: value} array into object.
				const resObj = result.reduce((acc, cur) => ({...acc, ...cur }), {});
				return ProductActions.deeplyLoaded(id, resObj);
			}
		)
	);

	constructor(private http: HttpClient, private actions$: Actions) {}

	sendPatchRequest(payload) {
		return this.http.patch(`api/product/${payload.id}`, { [payload.propName]: payload.value});
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
}
