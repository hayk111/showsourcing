import { Product } from '../product/product.model';

export enum NewProductDlgActionType {
	CREATE_PRODUCT = '[New Product Dialog] Creating',
	SET_READY = '[New Product Dialog] setting ready'
}


export class NewProductDlgActions {

	static createSupplier(product: Product) {
		return {
			type: NewProductDlgActionType.CREATE_PRODUCT,
			payload: product
		};
	}

	static setReady() {
		return {
			type: NewProductDlgActionType.SET_READY
		};
	}
}

