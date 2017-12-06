import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { ActionType, ProductActions } from '../action/product.action';
import { TypedAction } from '../utils/typed-action.interface';
import { switchMap, map, merge, mergeMap, startWith } from 'rxjs/operators';
import { zip } from 'rxjs/observable/zip';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { ProductVote } from '../model/product-vote.model';
import { User } from '../model/user.model';
import { selectUser } from '../selectors/user.selector';


@Injectable()
export class ProductEffects {
	userID: string;
	// Listen for the patch action
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

	@Effect()
	vote$ = this.actions$.ofType<any>(ActionType.VOTE).pipe(
		map(action => action.payload),
		// 1 we add an uuid to the vote
		map(({productId, value}) => ({ productId, value, userId: this.userID })),
		// we then switch to an http request
		switchMap( v => this.postVote(v)
			.pipe(
				// add vote when request is done
				map( (r: ProductVote) => ProductActions.addVote(v.productId, r, this.userID)),
				// but before sending that http request we send a pendingVote to the store
				startWith( ProductActions.addPendingVote(v) as any)
				// .catchError( e => ProductActions.voteFailed(v) )
			)
		)
	);

	constructor(private http: HttpClient, private actions$: Actions, private store: Store<any>) {
		this.store.select(selectUser).map(user => user.id)
			.subscribe(id => this.userID = id);
	}

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

	postVote(v: any) {
		return this.http.post(`api/product/${v.productId}/vote`, { value : v.value});
	}
}
