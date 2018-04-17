import { Product } from '~app/entity/store/product/product.model';


export enum LatestProductActionType {
	LOAD = '[Latest Products Supplier] Loading...',
	SET = '[Latest Products Supplier] Setting...'
}

export class LatestProductActions {
	static load() {
		return {
			type: LatestProductActionType.LOAD,
		};
	}

	static set(products: Array<Product>) {
		return {
			type: LatestProductActionType.SET,
			payload: products
		};
	}
}
