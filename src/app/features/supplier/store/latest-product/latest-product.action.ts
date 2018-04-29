import { Product } from '~product/store/product/product.model';
import { EntityTarget } from '~app/entity';


export enum LatestProductActionType {
	LOAD = '[Latest Products Supplier] Loading...',
	SET = '[Latest Products Supplier] Setting...'
}

export class LatestProductActions {
	static load() {
		return {
			type: LatestProductActionType.LOAD
		};
	}

	static set(products: Array<Product>) {
		return {
			type: LatestProductActionType.SET,
			payload: products
		};
	}
}
