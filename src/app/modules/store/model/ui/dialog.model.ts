
export interface Dialog {
	open: boolean;
	metadata: any;
}

export enum DialogName {
	PRODUCT = 'productDialog',
	NEW_TASK = 'new task',
	NEW_SUPPLIER = 'new supplier'
}
