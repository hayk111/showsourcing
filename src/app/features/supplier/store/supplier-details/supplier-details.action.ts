
export enum SupplierDetailActionType {
	FOCUS = '[Supplier details] focus',
}


export class SupplierDetailsAction {
	static focus(id: string) {
		return {
			type: SupplierDetailActionType.FOCUS,
			payload: id
		};
	}
}
