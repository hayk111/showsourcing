
export class SupplierStatusType {
	id: string;
	name?: string;
	inWorkflow?: boolean;
	category?: string;
	step?: number;
	__typename ?= 'SupplierStatusType';
}
