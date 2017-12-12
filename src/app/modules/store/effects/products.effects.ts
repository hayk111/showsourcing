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
import { AppComment } from '../model/comment.model';
import { ProductService } from '../../shared/entities-services/product.service';
import { uuid } from '../utils/uuid.utils';
import { FileUploader2 } from '../../shared/uploader/services/file-uploader2.service';


@Injectable()
export class ProductEffects {
	userID: string;


	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(filterGroupName => {
			// get products
			return this.srv.load(filterGroupName).pipe(
				// set products
				map(r => ProductActions.setData(r)),
				// before everything set products as pending
				startWith(ProductActions.setPending() as any)
			);
		})
	);

	// Listen for the patch action and sends a patch request to backend
	@Effect({ dispatch: false })
	patch$ = this.actions$.ofType(ActionType.PATCH_PROPERTY).pipe(
		map((action: TypedAction<any>) => action.payload),
		switchMap(p => this.srv.sendPatchRequest(p))
	);

	// deeps load a product with all its sub items (like images, attachments etc).
	@Effect()
	deepLoad$ = this.actions$.ofType<any>(ActionType.DEEP_LOAD_REQ).pipe(
		map(action => action.payload),
		switchMap(
			id => this.srv.deepLoad(id),
			(id, result: Array<any>) => {
				// transform {key: value} array into object.
				const resObj = result.reduce((acc, cur) => ({...acc, ...cur }), {});
				return ProductActions.deeplyLoaded(id, resObj);
			}
		)
	);

	@Effect()
	vote$ = this.actions$.ofType<any>(ActionType.VOTE).pipe(
		map(action => action.payload),
		// 1 we add the user id so we can find the vote easily (there is only 1 vote per user)
		map(({productId, value}) => ({ productId, value, userId: this.userID })),
		// we then switch to an http request
		switchMap( v => this.srv.postVote(v)
			.pipe(
				// add vote when request is done
				map( (r: ProductVote) => ProductActions.addVote(v.productId, r, this.userID)),
				// but before sending that http request we send a pendingVote to the store
				startWith( ProductActions.addPendingVote(v) as any)
				// catchError( e => ProductActions.voteFailed(v) )
			)
		)
	);

	@Effect()
	comment$ = this.actions$.ofType<any>(ActionType.COMMENT).pipe(
		map(action => action.payload),
		// we add an uuid to the payload to retrieve it easily, a timestamp will do
		map(p => ({...p, pendingUuid: Date.now(), createdByUserId: this.userID })),
		map(comment => ProductActions.addPendingComment(comment))
	);

	@Effect()
	pendingComment$ = this.actions$.ofType<any>(ActionType.ADD_PENDING_COMMENT)
	.pipe(
		map(action => action.payload),
		switchMap(
			(comment: AppComment) => this.srv.postComment(comment),
			(comment, r) => ProductActions.setCommentReady(comment.productId, comment.pendingUuid) )
	);

	// 1. Add pending image for each image sent
	@Effect({dispatch: false})
	addImages$ = this.actions$.ofType<any>(ActionType.ADD_IMAGES)
		.map(action => action.payload)
		.do(p => {
			p.imgFiles.forEach(imgFile => {
				const img = { pending: true, data: FileUploader2.imgToBase64(imgFile) };
				this.store.dispatch(ProductActions.addPendingImage(p.productId, imgFile, img));
			});
		});

	// 2. upload image
	// 3. when uploaded set pending image to ready
	@Effect()
	pendingImage$ = this.actions$.ofType<any>(ActionType.ADD_PENDING_IMAGE).pipe(
		map(action => action.payload),
		map(p => ({...p, pendingUuid: uuid()})),
		switchMap(
			p => this.srv.postImage(p.productId, p.img),
			p => ProductActions.setImageReady(p.productId, p.img.pendingUuid)
		)
	);


	constructor(private srv: ProductService, private actions$: Actions, private store: Store<any>) {
		this.store.select(selectUser).map(user => user.id)
			.subscribe(id => this.userID = id);
	}
}
