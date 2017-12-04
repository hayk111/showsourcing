import { Action } from '@ngrx/store';
import { Product } from '../model/product.model';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
		SET_DATA = '[Product] setting',
		SET_PENDING = '[Product] pending',
		SET_IMG_READY = '[Product] img ready',
		PATCH_PROPERTY = '[Product] patching',
		DEEP_LOAD_REQ = '[Product] Deep load request ',
		DEEPLY_LOADED = '[Product] Deeply loaded',
		ADD_IMAGES = '[Product] Adding image'
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

		static setImageReady(id: string, imgID: string) {
			return {
				type: ActionType.SET_IMG_READY,
				payload: { id }
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

		static addImages(id: string, img: any) {
			return {
				type: ActionType.ADD_IMAGES,
				payload: { id, img }
			};
		}
}
