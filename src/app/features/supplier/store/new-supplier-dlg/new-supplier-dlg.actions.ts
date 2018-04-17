import { Supplier } from '~app/entity/store/supplier/supplier.model';

export enum NewSupplierDlgActionType {
	CREATE_SUPPLIER = '[New Supplier Dialog] Creating',
	SET_READY = '[New Supplier Dialog] setting ready'
}


export class NewSupplierDlgActions {

	static createSupplier(supplier: Supplier) {
		return {
			type: NewSupplierDlgActionType.CREATE_SUPPLIER,
			payload: supplier
		};
	}

	static setReady() {
		return {
			type: NewSupplierDlgActionType.SET_READY
		};
	}
}

