import { Action } from '@ngrx/store';
import { Product } from '../model/product.model';
import { TypedAction } from '../utils/typed-action.interface';
import { ProductVote } from '../model/product-vote.model';

export enum ActionType {
		SET_DATA = '[Product] setting',
		SET_PENDING = '[Product] pending',
		PATCH_PROPERTY = '[Product] patching',
		DEEP_LOAD_REQ = '[Product] Deep load request ',
		DEEPLY_LOADED = '[Product] Deeply loaded',
		SET_IMG_READY = '[Product] img ready',
		ADD_PENDING_IMAGE = '[Product] add pending image',
		VOTE = '[Product] Vote',
		ADD_VOTE_PENDING = '[Product] Add pending vote',
		ADD_VOTE = '[Product] Add vote'
}

export class ProductActions {
		static setData(payload: Array<Product>): TypedAction<Array<Product>> {
				return {
						type: ActionType.SET_DATA,
						payload
				};
		}

		static setPending() {
			return {
				type: ActionType.SET_PENDING
			};
		}

		static patch(id: string, propName: string, value: any) {
			return {
				type: ActionType.PATCH_PROPERTY,
				payload: { id, propName, value }
			};
		}

		static deepLoad(id: string) {
			return {
				type: ActionType.DEEP_LOAD_REQ,
				payload: id
			};
		}

		static deeplyLoaded(id: string, props: any) {
			return {
				type: ActionType.DEEPLY_LOADED,
				payload: { id, props }
			};
		}

		static addPendingImage(id: string, img: any) {
			return {
				type: ActionType.ADD_PENDING_IMAGE,
				payload: {id, img}
			};
		}

		static setImageReady(id: string, imgID: number) {
			return {
				type: ActionType.SET_IMG_READY,
				payload: { id, imgID }
			};
		}

		static voteProduct(productId: string, value: number) {
			return {
				type: ActionType.VOTE,
				payload: { productId, value }
			};
		}

		static addPendingVote(v: { productId: string, value: number, userId: string, pending?: undefined | boolean }) {
			v.pending = true;
			return {
				type: ActionType.ADD_VOTE_PENDING,
				payload: v
			};
		}

		static addVote(productId: string, vote: ProductVote, userId: string) {
			return {
				type: ActionType.ADD_VOTE,
				payload: { productId, vote, userId }
			};
		}
}
