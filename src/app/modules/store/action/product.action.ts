import { Action } from '@ngrx/store';
import { Product } from '../model/product.model';
import { TypedAction } from '../utils/typed-action.interface';
import { ProductVote } from '../model/product-vote.model';
import { AppComment } from '../model/comment.model';
import { FilterGroupName } from '../model/filter.model';

export enum ActionType {
		LOAD = '[Product load]',
		SET_PENDING = '[Product] pending',
		SET_DATA = '[Product] setting',
		PATCH_PROPERTY = '[Product] patching',
		DEEP_LOAD_REQ = '[Product] Deep load request ',
		DEEPLY_LOADED = '[Product] Deeply loaded',
		VOTE = '[Product] Vote begin',
		ADD_VOTE_PENDING = '[Product] Add pending vote',
		SET_VOTE_READY = '[Product] Set vote ready',
		COMMENT = '[Product] Commenting',
		ADD_PENDING_COMMENT = '[Product] Add pending comment',
		SET_COMMENT_READY = '[Product] Set comment ready',
		ADD_IMAGES = '[Product] Add images begin',
		ADD_PENDING_IMAGE = '[Product] Add pending image',
		SET_IMG_READY = '[Product] Set img ready',
		ADD_ATTACHMENTS = '[Product] Add attachments begin',
		ADD_PENDING_ATTACHMENT = '[Product] Add pending attachment',
		SET_ATTACHMENT_READY = '[Product] Set attachment ready'
}

export class ProductActions {

	static load(filterGroupName: FilterGroupName) {
		return {
			type: ActionType.LOAD,
			payload: filterGroupName
		};
	}

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
			type: ActionType.SET_VOTE_READY,
			payload: { productId, vote, userId }
		};
	}

	static comment(productId: string, text: string) {
		return {
			type: ActionType.COMMENT,
			payload: { text, productId }
		};
	}

	static addPendingComment(comment: AppComment) {
		comment.pending = true;
		return {
			type: ActionType.ADD_PENDING_COMMENT,
			payload: comment
		};
	}

	static setCommentReady(productId, pendingUuid) {
		return {
			type: ActionType.SET_COMMENT_READY,
			payload: { productId, pendingUuid }
		};
	}

	static addImages(productId: string, imgFiles: Array<any>) {
		return {
			type: ActionType.ADD_IMAGES,
			payload: { productId, imgFiles }
		};
	}

	static addPendingImage(productId: string, imgFile: any, img: any) {
		return {
			type: ActionType.ADD_PENDING_IMAGE,
			payload: { productId, img, imgFile }
		};
	}

	static setImageReady(productId: string, imgId: number) {
		return {
			type: ActionType.SET_IMG_READY,
			payload: { productId, imgId }
		};
	}

	static addAttachments(productId: string, attachments: Array<any>) {
		return {
			type: ActionType.ADD_ATTACHMENTS,
			payload: { productId, attachments }
		};
	}

	static addPendingAttachment(productId: string, attachment: any) {
		return {
			type: ActionType.ADD_PENDING_ATTACHMENT,
			payload: { productId, attachment }
		};
	}

	static setAttachmentReady(productId: string, attachmentId: number) {
		return {
			type: ActionType.SET_ATTACHMENT_READY,
			payload: { productId, attachmentId }
		};
	}
}
